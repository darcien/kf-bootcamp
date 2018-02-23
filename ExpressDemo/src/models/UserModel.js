// @flow

import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

// 'User', collection of 'User' -> 'users' in the db.
export default mongoose.model('User', UserSchema);
