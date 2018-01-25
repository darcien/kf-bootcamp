// @flow
import React, {Component} from 'react';

type Props = {
  inputValue: string,
  onAddItem: (content: string) => void,
  onChange: (e: Object) => void,
};
type State = {
  inputValue: string,
};

class NewItemForm extends Component<Props, State> {
  state = {inputValue: this.props.inputValue};

  // To handle or not to handle, that is the question
  _handleInputChange = (e: Object) => {
    let {onChange} = this.props;
    onChange(e);
    this.setState({inputValue: e.target.value});
  };

  render() {
    let {onAddItem, onChange} = this.props;
    // let onChange = (event) => this.setState({inputValue: event.target.value});

    let onSubmit = () => {
      onAddItem(this.state.inputValue);
      this.setState({inputValue: ''});
    };

    console.log('Current form state value = ', this.state.inputValue);

    return (
      <div>
        {/* <input type="text" value={this.props.inputValue} onChange={onChange} /> */}
        <input
          type="text"
          value={this.props.inputValue}
          onChange={this._handleInputChange}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  }
}

export default NewItemForm;
