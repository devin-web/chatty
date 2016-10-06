import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

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
    console.log("Connecting to server");

    this.state.socket = new WebSocket( "ws://localhost:4000/" );

    this.state.socket.onmessage = (event) => {
      // code to handle incoming message
      var message = JSON.parse( event.data );

      switch( message.type ) {
      case "incomingMessage":
      case "incomingNotification": //so that notifications and messages are sorted together, chronologically
        this.addMessage( message );
        break;
      case "clientCount":
        this.updateClientCount( Number( message.clientCount ) );
        break;
      default:
        console.log( "Error, unexpected packet received" );
        break;
      }

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
    this.state.messages.push( message );

    this.setState( this.state )
  },

  render: function() {
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
