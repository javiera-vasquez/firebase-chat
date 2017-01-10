import React, { Component } from 'react';
import { Router } from 'react-router';
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
      rooms: [],
      isValidForm: false,
      userName: '',
      userAvatar: '',
      roomSelected: undefined,
      activeElements: {avatar: 0, room: 0},
      placeHolders: this.placeHolders()
    };

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
        userAvatar: this.state.placeHolders[0],
        roomSelected: rooms[0]
      });
    });
  }


  // lisen for changes in the input name
  handleInputChange(event) {
    this.setState({userName: event.target.value});
  }

  // callback for the selected avatar
  selecAvatar(avatar, index) {
    this.setState({
      userAvatar: avatar,
      activeElements: {...this.state.activeElements, avatar: index}
    });
  }

  // callback for the selected chat room
  selectChatRoom(room, index) {
    this.setState({
      roomSelected: room,
      activeElements: {...this.state.activeElements, room: index}
    });
  }

  // check the form and go to the selected chat room
  goToChatRoom() {
    console.log(this.props);
    console.log('user', this.state.userName, this.state.userAvatar, this.state.roomSelected);
    //this.props.router.push({pathname: '/room'});
  }



  // render this component
  render() {
    return (
      <div className="form-wrapper col-xs-6">
        <input
          type="text"
          className="form-input"
          value={this.state.userName}
          onChange={this.handleInputChange}
          placeholder="Nombre de usuario"
        />
        <PlaceHolders
          placeHolders={this.state.placeHolders}
          handleClick={this.selecAvatar}
          activeElement={this.state.activeElements.avatar}
        />
        <ChatRooms
          rooms={this.state.rooms}
          handleClick={this.selectChatRoom}
          activeElement={this.state.activeElements.room}
        />
        <button className="button call-to-action" onClick={this.goToChatRoom}>Ir al chat!</button>
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

// Check type of firebase instance
Home.propTypes = { firebase: React.PropTypes.object };