import React, { Component } from 'react';

import { firebaseGetLastMessage, firebasePushMessage } from '../firebase';
import ChatMessageLoop from './ChatMessageLoop';

import './Chat.css'

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
      this.setState({messages: [message.val()].concat(this.state.messages)});
    });
  }


  // lisen for changes in the input name
  handleInputChange(event) {
    this.setState({message: event.target.value});
  }

  SendNewMessage(event) {
    event.preventDefault();

    firebasePushMessage(this.props.firebase, this.props.user.room, this.createNewMessage({
      name: this.props.user.name,
      avatar: this.props.user.avatar,
      message: this.state.message
    }));

    this.setState({message: ''});
  }

  createNewMessage(params) {
    return {
      author:{
        name: params.name,
        user_image_url: params.avatar
      },
      text: params.message,
      timestamp: Date.now().toString()
    }
  }


  // render this component
  render() {
    let wrapperHeight = {height: [(window.innerHeight - 50), 'px'].join('')};

    return (
      <div style={wrapperHeight} className="col-xs-10 chat-wrapper">
        <h4>#{this.props.user.room}</h4>

        <div className="chat-wrapper-loop">
          <ChatMessageLoop messages={this.state.messages} />
        </div>

        <div className="chat-wrapper-form">
          <form onSubmit={this.SendNewMessage}>
            <input
              type="text"
              className="chat-input"
              value={this.state.message}
              onChange={this.handleInputChange}
              placeholder=""
            />
            <button className="button chat-button" type="submit">Enviar!</button>
          </form>
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