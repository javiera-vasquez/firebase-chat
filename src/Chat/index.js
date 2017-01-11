import React, { Component } from 'react';
import { firebaseGetRooms } from '../firebase';

class Chat extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);
  }

  render() {
    return <p>Soy un chat</p>
  }
}

export default Chat;

// Check type of the props pass from App
Chat.propTypes = {firebaseGetRooms: React.PropTypes.object}