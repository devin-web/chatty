import React, {Component} from 'react';
import Message from './Message.jsx';


const ChatBar = React.createClass({

  getInitialState: function() {
    return { value: "" }
  },

  componentWillUpdate: function() {
    console.log('Update');
  },

  componentDidUpdate() {
    console.log('Updated', this.state.value);
  },

  handleChange: function(event) {
    this.setState( { value: event.target.value } );
    console.log('Change', this.state.value);
  },

  onKeyPress( event ){
    if( event.key === "Enter" ){
      this.props.onKeyPressedEnter( this.props.currentUser.name, this.state.value )
      this.setState( { value: "" } );
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
                defaultValue={ this.props.currentUser.name }   />
        <input  id="new-message" type="text" placeholder="Type a message and hit ENTER"
                value={this.state.value}
                onChange={this.handleChange}
                onKeyPress={this.onKeyPress}
        />
      </footer>
    );
  }
});
export default ChatBar;
