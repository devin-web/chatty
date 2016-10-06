import React, {Component} from 'react';
import Message from './Message.jsx';


const ChatBar = React.createClass({

  getInitialState: function() {
    return { value: "", username: "" }
    this.usernameSinceLastEnter = ""
  },

  componentDidMount() {
    let newState = Object.assign({}, this.state,
      {
        username: this.props.currentUser,
      });
    this.usernameSinceLastEnter = this.props.currentUser;

    this.setState( newState );
  },

  handleChange: function(event) {
    let newState = Object.assign({}, this.state, { value: event.target.value });
    this.setState( newState );
  },

  handleChangeName: function(event) {
    this.props.updateCurrentUser( event.target.value );

    let newState = Object.assign({}, this.state, { username: { name: event.target.value }});
    this.setState( newState );
  },

  onKeyPress: function( event ){
    if( event.key === "Enter" ){

      if( this.state.username.name !== this.usernameSinceLastEnter.name ){

        let newState = Object.assign({},
          this.state,
          { username: this.state.username });

        this.setState( newState );

        this.props.changeName(
          this.usernameSinceLastEnter.name ? this.usernameSinceLastEnter : { name: "Anonymous" },
          this.state.username.name ? this.state.username : { name: "Anonymous" } );

        this.usernameSinceLastEnter = this.state.username;
      }

      this.props.onKeyPressedEnter( {
        username: this.state.username.name ? this.state.username : { name: "Anonymous" },
        content: this.state.value

      });

      let newState = Object.assign({}, this.state, { value: "" });
      this.setState( newState );
    }
  },

  render: function() {
    return (
      <footer>
        <input id="username" type="text"
                placeholder={
                  this.state.username.name ? "" : "Enter a username (optional)"
                }
                value={ this.state.username.name ? this.state.username.name : "" }
                onChange={ this.handleChangeName }
        />
        <input  id="new-message" type="text" placeholder="Type a message and hit ENTER"
                value={ this.state.value }
                onChange={ this.handleChange }
                onKeyPress={ this.onKeyPress }
        />
      </footer>
    );
  }
});
export default ChatBar;
