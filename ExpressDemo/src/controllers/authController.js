//@flow

import type {$Request as Req, $Response as Res} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {SECRET} from '../globals/config';

import UserModel from '../models/UserModel';

type SignupBody = {
  body: {
    name: ?string,
    email: ?string,
    password: ?string,
    confirmationPassword: ?string,
  },
};

type LoginBody = {
  body: {
    email: ?string,
    password: ?string,
  },
};

type SignupReq = SignupBody & Req;
type LoginReq = LoginBody & Req;

async function signupController(req: SignupReq, res: Res) {
  let {name, email, password, confirmationPassword} = req.body;

  if (
    name === undefined ||
    email === undefined ||
    password === undefined ||
    confirmationPassword === undefined
  ) {
    res.status(400).json({
      status: 'ERROR',
      message: 'Incomplete request',
    });
  } else if (password !== confirmationPassword) {
    res.status(400).json({
      status: 'ERROR',
      message: 'Password mismatch',
    });
  } else {
    try {
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      let users = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      let token = jwt.sign({data: email}, SECRET, {expiresIn: '1h'});
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          //Bla
        }
        console.log('decoded', decoded);
      });
      res.status(200).json({
        status: 'OK',
        token: jwt.sign({data: users._id}, SECRET, {expiresIn: '1h'}),
      });
    } catch (e) {
      res.status(500).json({
        status: 'ERROR',
        message: 'Internal error',
      });
    }
  }
}

async function loginController(req: LoginReq, res: Res) {
  let {email, password} = req.body;
  if (email === undefined || password === undefined) {
    res.status(400).json({
      status: 'ERROR',
      message: 'Incomplete request',
    });
  } else {
    try {
      let user = await UserModel.findOne({email}, 'name password');
      let correctPassword = await bcrypt.compare(password, user.password);

      if (correctPassword) {
        res.status(200).json({
          status: 'OK',
          message: {
            output: correctPassword,
          },
          token: jwt.sign({data: user._id}, SECRET, {expiresIn: '1h'}),
        });
      } else {
        throw new Error('wrong password');
      }
    } catch (err) {
      res.status(404).json({
        status: 'ERROR',
        message: err.message,
      });
    }
  }
}

export {loginController, signupController};
