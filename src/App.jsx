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
      currentUser: {name: ""},
      messages: [], // messages coming from the server will be stored here as they arrive
      systemMessages: [],
      clientCount: 0
    };
    return data;
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      this.state.messages.push({id: 3, type:"incomingMessage", username: { name:  "Michelle" }, content: "Hello there!"});
      // Update the state of the app component. This will call render()
      this.setState( this.state );
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
      console.log( "message:", message );

      switch( message.type ) {
      case "incomingMessage":
      case "incomingNotification": //so that notifications and messages are sorted together, chronologically
        this.addMessage( message );
        break;
      // case "incomingNotification":
      //   this.addSystemMessage( message );
      //   break;
      case "clientCount":
        this.updateClientCount( Number( message.clientCount ) );
        break;
      default:
        console.log( "Error, unexpected packet received" );
        break;
      }

    // code to handle incoming message
    }

  },

  updateClientCount: function( clientCount ) {
    let newState = Object.assign( {}, this.state, { clientCount: clientCount });
    this.setState( newState );
  },

  updateCurrentUser: function( name ) {
    let newState = Object.assign({}, this.state, { currentUser: name } );
    this.setState( newState );
  },

  changeName: function( origName, newName ) {

    let newState = Object.assign({}, this.state,  { currentUser: newName.name  } );

    this.setState( newState );

    this.state.socket.send( JSON.stringify({
        type: "postNotification",
        content: origName.name + " changed their name to " + newName.name }));

  },

  sendMessage: function( message ) {
    this.state.socket.send( JSON.stringify({
      type: "postMessage",
      username: message.username,
      content: message.content })
    );
  },

  addMessage: function ( message ) {
    // var id = this.state.data.messages.length + 1;
    console.log( "message: ", message );

    this.state.messages.push( message );


    this.setState( this.state )
  },

  // addSystemMessage: function ( message ) {
  //   console.log( "system message:", message );

  //   this.state.systemMessages.push({
  //     id: message.id,
  //     content: message.content
  //   });
  // },

  render: function() {
    console.log("App");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <p id="client_count">{this.state.clientCount} Users online</p>
        </nav>
        <MessageList  messages={ this.state.messages }
        />
        <ChatBar  currentUser={ this.state.currentUser }
                  onKeyPressedEnter={ this.sendMessage }
                  changeName={ this.changeName }
                  updateCurrentUser={ this.updateCurrentUser }
        />
      </div>
    );
  }
});

export default App;

//                      systemMessages={ this.state.systemMessages }

//class App extends Component {
//  render() {
//    return(
//      <h1>Hello React :)</h1>
//    );
//
//  }
//}
//export App;
