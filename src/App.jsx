//var WebSocketServer = require('websocket').server;
//const  wss = require( 'ws' );

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

// wsServer = new WebSocketServer({
//     httpServer: server
// });

// var data = {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       id: 1,
//       username: "Bob",
//       content: "Has anyone seen my marbles?"
//     },
//     {
//       id: 2,
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// };
const App = React.createClass({
  getInitialState: function() {
    var data = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    return {data: data};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      this.state.data.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
      // Update the state of the app component. This will call render()
      this.setState({data: this.state.data})
    }, 3000);

    console.log("Connecting to server");
  //  var ws = new WebSocket( "wss://localhost:4000" );
    this.state.socket = new WebSocket( "ws://localhost:4000/" );

    // setTimeout(() => {
    // this.state.socket.send( "Test" );
    // }, 500 );

    this.state.socket.onmessage = (event) => {
      console.log(event);
      var message = JSON.parse( event.data );
      this.addMessage( message );
    // code to handle incoming message
    }

  },

  sendMessage: function( message ) {
    this.state.socket.send( JSON.stringify({
      username: message.username,
      content: message.content })
    );
  },

  addMessage: function ( message ) {
    // var id = this.state.data.messages.length + 1;

    this.state.data.messages.push({
      id: message.id,
      username: message.username,
      content: message.content
    });


    this.setState({data: this.state.data})
  },

  render: function() {
    console.log("App");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar  currentUser={this.state.data.currentUser}
                  onKeyPressedEnter={this.sendMessage}/>
      </div>
    );
  }
});

export default App;

//class App extends Component {
//  render() {
//    return(
//      <h1>Hello React :)</h1>
//    );
//
//  }
//}
//export App;
