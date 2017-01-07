import app from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';

// Firebase config domain and key
export const firebaseConfig = {
  apiKey: "AIzaSyCL7buZsLVXXQ3Wp7buGEUdlU2qhAPpVwY",
  authDomain: "beer-js.firebaseio.com",
  databaseURL: "https://beer-js.firebaseio.com/",
};

// Message spec
export const messageSpec ={
  author:{
    name: 'Javier Vasquez',
    user_image_url: 'http://placekitten.com/200/200'
  },
  text: 'soy un nuevo mesanje del spec',
  timestamp: '1483737061'
}

// Create a new firebase isntance auth that and return a fb.database promise
export const firebaseProvider = config => {
  app.initializeApp(config);

  return auth().signInAnonymously()
    .then(() => database())
    .catch(error => {
      console.log('error type', error.code);
      console.log('error message', error.message);
    });
}

// Return a array of the availables chat rooms
export const firebaseGetRooms = db => {
  return db.ref('rooms').once('value').then(snap => {
    let rooms = [];
    snap.forEach(child => { rooms = rooms.concat(child.key) });
    return rooms;
  });
}

// Get all the messages of the room in a snap and pass a callback for each one
export const firebaseGetAllMessages = (db, room, cb) => {
  db.ref(makeChatRoute(room)).once('value').then(messages => {
    messages.forEach(message => { cb(message) });
  });
}

// This is another form to make the same func but with listener... dont forget to off()
// export const firebaseGetAllMessages = (db, room, cb) => {
//   let route = ['rooms/', room, '/messages'].join('');
//   db.ref(route).on('value', messages => {
//     messages.forEach(message => { cb(message) });
//   });
// }

// Create a listener a for every new message in the chat room and pass a callback
export const firebaseGetLastMessage = (db, room, cb) => {
  db.ref(makeChatRoute(room)).on('child_added', cb);
}

// Turn off the listener for firebaseGetLastMessage()
export const firebaseRemoveListener = (db, room, cb) => {
  db.ref(makeChatRoute(room)).off('child_added', cb)
}

// Push a new message to the chat room
export const firebasePushMessage = (db, room, message) => {
  db.ref(makeChatRoute(room)).push(message);
}

function makeChatRoute(room) {
  return ['rooms/', room, '/messages'].join('');
}