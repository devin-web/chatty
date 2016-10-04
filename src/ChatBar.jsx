import React, {Component} from 'react';
import Message from './Message.jsx';


const ChatBar = React.createClass({
  render: function() {

    console.log( "ChatBar's props: ", this.props );

    return (
      <footer>
        <input id="username" type="text"
                placeholder={ this.props.currentUser ? "" : "Enter a username (optional)" }
                defaultValue={ this.props.currentUser.name }   />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
});
export default ChatBar;
