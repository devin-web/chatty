import React, {Component} from 'react';
import Message from './Message.jsx';


const ChatBar = React.createClass({

  getInitialState: function() {
    return { value: "", username: "" }
  },

  componentWillUpdate: function() {
    console.log('Update');
  },

  componentDidUpdate() {
    console.log('Updated', this.state.value);
  },

  handleChange: function(event) {
    //this.setState( { value: event.target.value } );
    let newState = Object.assign({}, this.state, { value: event.target.value });
    this.setState( newState );
    console.log( "Change", this.state.value);
  },

  handleChangeName: function(event) {
    let newState = Object.assign({}, this.state, { username: event.target.value });
    this.setState( newState );
    console.log( "ChangeName", this.state.username );
  },

  onKeyPress( event ){
    if( event.key === "Enter" ){
      this.props.onKeyPressedEnter( {
        //username: this.props.currentUser.name,
        username: this.state.username,
        content: this.state.value } );
      let newState = Object.assign({}, this.state, { value: "" });
      this.setState( newState );
      //this.setState( { value: "" } );
    }
    console.log('Keypress', this.state.value);
  },

  render: function() {

    console.log( "ChatBar's props: ", this.props );

    return (
      <footer>
        <input id="username" type="text"
                placeholder={
                  this.props.currentUser ? "" : "Enter a username (optional)"
                }
                defaultValue={ this.props.currentUser.name }
                onChange={ this.handleChangeName }
        />
        <input  id="new-message" type="text" placeholder="Type a message and hit ENTER"
                value={ this.state.value }
                onChange={ this.handleChange }
                onKeyPress={ this.onKeyPress }
        />
      </footer>
    );
  }
});
export default ChatBar;
