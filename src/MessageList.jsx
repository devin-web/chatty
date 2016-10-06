import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

const MessageList = React.createClass({
  render: function() {

    console.log("MessageList");

    var messages = [];
    var systemMessages = [];

    for(var i=0; i < this.props.messages.length; i++){
      messages.push
      (
        <Message  key={this.props.messages[i].id}
                  username={this.props.messages[i].username}
                  content={this.props.messages[i].content}/>
      );
    }

    for( var i=0; i < this.props.systemMessages.length; i++ ){
      systemMessages.push
      (
        <SystemMessage  key={ this.props.systemMessages[i].id }
                        content={ this.props.systemMessages[i].content }/>
      )
    }

    return (
      <div id="message-list">
        {
          messages
        }
        {
          systemMessages
        }
      </div>
    );
  }
});
        // <div className="message system">
          // Anonymous1 changed their name to nomnom.
        // </div>

export default MessageList;