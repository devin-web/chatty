import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

const MessageList = React.createClass({
  render: function() {

    var messages = [];

    for(var i=0; i < this.props.messages.length; i++){

      if( this.props.messages[i].type === "incomingMessage" ){
        messages.push(
          <Message  key={this.props.messages[i].id}
                    username={this.props.messages[i].username.name}
                    content={this.props.messages[i].content}/>
        );
      }
      else {
        messages.push(
          <SystemMessage  key={ this.props.messages[i].id }
                          content={ this.props.messages[i].content }/>
        );
      }
    }
    return (
      <div id="message-list">
        {
          messages
        }
      </div>
    );
  }
});
        // <div className="message system">
          // Anonymous1 changed their name to nomnom.
        // </div>

export default MessageList;