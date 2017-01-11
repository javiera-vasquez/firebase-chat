import React, { Component } from 'react';
import { firebaseGetAllMessages, firebasePushMessage } from '../firebase';

class Chat extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);

    this.state = {messages: []};
    this.newMessage = this.newMessage.bind(this);
  }

  // make a firebase call after mounting this component
  componentDidMount() {
    let getMessages = [];

    firebaseGetAllMessages(this.props.firebase, this.props.user.room, snap => {
        getMessages = getMessages.concat(snap.val());
      }).then(() => {
        console.log('in then', getMessages);
        this.setState({messages: getMessages});
    });
  }

  newMessage() {}


  // render this component
  render() {
    console.log('in render', this.state.messages);

    return (
      <div className="form-wrapper col-xs-8">
        {this.state.messages.map(message => {
          return <p>{message.text}</p>
        })}
      </div>
    )
  };
}

export default Chat;

// Check type of the props pass from App
Chat.propTypes = {
  firebase: React.PropTypes.object,
  user: React.PropTypes.object
}