import React, {Component} from 'react';


const SystemMessage = React.createClass({
  render: function() {

    console.log("SystemMessage");

    return (
      <div className="message system">
        { this.props.content }
      </div>
    );
  }
});
//Anonymous1
//I won't be impressed with technology until I can download food.
export default SystemMessage;