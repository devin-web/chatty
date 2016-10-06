import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function() {

    console.log("MessageList");

    var messages = [];

    for(var i=0; i < this.props.messages.length; i++){
      messages.push
      (
        <Message  key={this.props.messages[i].id}
                  username={this.props.messages[i].username}
                  content={this.props.messages[i].content}/>
      );
    }

    return (
      <div id="message-list">
        {
          messages
        }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
});

export default MessageList;