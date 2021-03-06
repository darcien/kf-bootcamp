// @flow

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

type State = {};

class App extends Component<State> {
  render() {
    return (
      <div>
        <RadioGroup name="favColor">
          <RadioItem label="red" />
          <RadioItem label="green" />
          <RadioItem label="blue" />
        </RadioGroup>
        <RadioGroup name="favFood">
          <RadioItem label="apple" />
          <RadioItem label="pizza" />
          <RadioItem label="water" />
        </RadioGroup>
      </div>
    );
  }
}

type GroupProps = {
  name: string,
  children: Array<Object>,
};

class RadioGroup extends Component<GroupProps> {
  getChildContext() {
    return {name: this.props.name};
  }

  static childContextTypes = {
    name: PropTypes.string,
  };

  render() {
    let {name, children} = this.props;

    return (
      <div>
        <p>{name} :</p>
        {children}
      </div>
    );
  }
}

type ItemProps = {
  label: string,
};

export class RadioItem extends Component<ItemProps> {
  static contextTypes = {
    name: PropTypes.string,
  };
  render() {
    let {label} = this.props;
    // let parentName = this._reactInternalFiber._debugOwner.child.child
    // .memoizedProps.name;
    return (
      <p>
        <input name={this.context.name} type="radio" value={label} id={label} />
        <label htmlFor={label}>{label}</label>
      </p>
    );
  }
}

let div = document.createElement('div');
if (document.body) {
  document.body.appendChild(div);
}

ReactDOM.render(<App />, div);
