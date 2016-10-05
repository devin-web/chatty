import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Message from './Message.jsx'

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?"
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const App = React.createClass({

  getInitialState: function() {
    return { data };
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
  },

  addMessage: function ( username, content ) {
    var id = this.state.data.messages.length + 1;

    this.state.data.messages.push({
      id: id,
      username: username,
      content: content
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
                  onKeyPressedEnter={this.addMessage}/>
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
