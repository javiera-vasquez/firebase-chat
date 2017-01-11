import React, { Component } from 'react';
import { firebaseGetLastMessage, firebasePushMessage } from '../firebase';
import ChatMessageLoop from './ChatMessageLoop';

class Chat extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };

    this.SendNewMessage = this.SendNewMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // make a firebase call after mounting this component
  componentDidMount() {
    firebaseGetLastMessage(this.props.firebase, this.props.user.room, message => {
      this.setState({
        messages: this.state.messages.concat(message.val())
      });
    });
  }


  // lisen for changes in the input name
  handleInputChange(event) {
    this.setState({message: event.target.value});
  }

  SendNewMessage() {
    let message = {
      author:{
        name: this.props.user.name,
        user_image_url: this.props.user.avatar
      },
      text: this.state.message,
      timestamp: '1483737061'
    }

    firebasePushMessage(this.props.firebase, this.props.user.room, message);

    this.setState({message: ''});
  }


  // render this component
  render() {
    return (
      <div className="col-xs-8">
        <h4>#{this.props.user.room}</h4>
        <div className="chat-wrapper">

          <ChatMessageLoop messages={this.state.messages} />

          <input
            type="text"
            className="chat-input"
            value={this.state.message}
            onChange={this.handleInputChange}
            placeholder="Nombre de usuario"
          />

          <button className="button chat-button" onClick={this.SendNewMessage}>send message</button>
        </div>
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