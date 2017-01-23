import React, { Component } from 'react';
import { random } from 'lodash';

import PlaceHolders from './PlaceHolders'
import ChatRooms from './ChatRooms'
import { firebaseGetRooms } from '../firebase';

import './Home.css';

class Home extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      rooms: [],
      activeElements: {avatar: 0, room: 0}
    };

    this.placeHolders = this.placeHolders();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selecAvatar = this.selecAvatar.bind(this);
    this.selectChatRoom = this.selectChatRoom.bind(this);
    this.goToChatRoom = this.goToChatRoom.bind(this);
  }

  // make a firebase call after mounting this component
  componentDidMount() {
    firebaseGetRooms(this.props.firebase).then(rooms => {
      this.setState({
        rooms: rooms,
        user: {
          ...this.props.user,
          avatar: this.placeHolders[0],
          room: rooms[0]
        }
      })
    });
  }


  // lisen for changes in the input name
  handleInputChange(event) {
    this.setState({user: {...this.state.user, name: event.target.value}});
  }

  // callback for the selected avatar
  selecAvatar(avatar, index) {
    this.setState({
      user: {...this.state.user, avatar: avatar},
      activeElements: {...this.state.activeElements, avatar: index}
    });
  }

  // callback for the selected chat room
  selectChatRoom(room, index) {
    this.setState({
      user: {...this.state.user, room: room},
      activeElements: {...this.state.activeElements, room: index}
    });
  }

  // check the form and go to the selected chat room
  goToChatRoom() {
    this.props.handleClick(this.state.user, 'Chat');
  }


  // render this component
  render() {
    return (
      <div className="form-wrapper col-xs-6">
        <input
          type="text"
          className="form-input"
          value={this.state.user.name}
          onChange={this.handleInputChange}
          placeholder="Nombre de usuario"
        />
        <PlaceHolders
          placeHolders={this.placeHolders}
          handleClick={this.selecAvatar}
          activeElement={this.state.activeElements.avatar}
        />
        <ChatRooms
          rooms={this.state.rooms}
          handleClick={this.selectChatRoom}
          activeElement={this.state.activeElements.room}
        />
        <button
          className="button call-to-action"
          onClick={this.goToChatRoom}>
          Ir al chat!
        </button>
      </div>
    );
  }


  // create and array of random placeHolders
  placeHolders() {
    let placeHolders= [];
    const route = (random, i) => `http://unsplash.it/200/200?image=${random}${i}`;

    for(let i = 0; i < 10; i++) {
      placeHolders = placeHolders.concat(route(random(1, 10), i));
    }

    return placeHolders;
  }
}

export default Home

// Check type of the props pass from App
Home.propTypes = {
  firebase: React.PropTypes.object,
  handleClick: React.PropTypes.func
};