import React, {Component} from 'react';


const Message = React.createClass({
  render: function() {

    console.log("Message");

    return (
      <div className="message">
        <span className="username">{ this.props.username }</span>
        <span className="content">{ this.props.content }</span>
      </div>
    );
  }
});
//Anonymous1
//I won't be impressed with technology until I can download food.
export default Message;