import React, {Component} from 'react';
import Message from './Message.jsx';


const ChatBar = React.createClass({

  getInitialState: function() {
    return { value: "", username: "" }
    //usernameSinceLastEnter: "" }
    this.usernameSinceLastEnter = ""
  },

  componentWillUpdate: function() {
    console.log('Update');
  },

  componentDidUpdate() {
    console.log("Updated", this.state.value);
  },

  componentDidMount() {
    let newState = Object.assign({}, this.state,
      {
        username: this.props.currentUser,
      //  usernameSinceLastEnter: this.props.currentUser
      });
    this.usernameSinceLastEnter = this.props.currentUser;

    this.setState( newState );
  },

  handleChange: function(event) {
    //this.setState( { value: event.target.value } );
    let newState = Object.assign({}, this.state, { value: event.target.value });
    this.setState( newState );
    console.log( "Change", this.state.value);
  },

  handleChangeName: function(event) {
    this.props.updateCurrentUser( event.target.value );

    let newState = Object.assign({}, this.state, { username: { name: event.target.value }});
    this.setState( newState );
    console.log( "handleChangeName", this.state.username );
  },


  onKeyPress: function( event ){
    if( event.key === "Enter" ){

      if( this.state.username.name !== this.usernameSinceLastEnter.name ){
        //var nameObj = { name: this.state.username }
        console.log( "changeName called",
          this.usernameSinceLastEnter,
          this.state.username );



        let newState = Object.assign({},
          this.state,
          { username: this.state.username });
            // usernameSinceLastEnter: this.state.username });

        this.setState( newState );

        this.props.changeName(
          this.usernameSinceLastEnter.name ? this.usernameSinceLastEnter : { name: "Anonymous" },
          this.state.username.name ? this.state.username : { name: "Anonymous" } );

        this.usernameSinceLastEnter = this.state.username;

        // let newState = Object.assign({},
        //   this.state,
        //   { username: this.state.username });

        // this.setState( newState );

        // console.log("newstate: ", this.state );

        // this.props.changeName( this.state.usernameSinceLastEnter, this.state.username );

        // let newState2 = Object.assign({},
        //   this.state, //newState,
        //   { usernameSinceLastEnter: this.state.username }
        // );
        // this.setState( newState2 );

        console.log("newstate2: ",this.state );
      }
      console.log( "***Username: ", this.state.username );

      this.props.onKeyPressedEnter( {
        //username: this.props.currentUser.name,
        username: this.state.username.name ? this.state.username : { name: "Anonymous" },
        content: this.state.value

      });

      let newState = Object.assign({}, this.state, { value: "" });
      this.setState( newState );
      //this.setState( { value: "" } );
    }
    console.log('Keypress', this.state.value);
  },

  render: function() {

    console.log( "ChatBar's props: ", this.props );
    console.log( "Chatbar's state: ", this.state );

    return (
      <footer>
        <input id="username" type="text"
                placeholder={
                  this.state.username.name ? "" : "Enter a username (optional)"
                }
                value={ this.state.username.name ? this.state.username.name : "" }
                onChange={ this.handleChangeName }
//                onKeyPress={ this.onKeyPressName }
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
