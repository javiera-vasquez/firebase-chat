import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  firebaseConfig,
  firebaseGetRooms,
  firebaseProvider,
  firebaseGetAllMessages,
  firebaseGetLastMessage,
  firebasePushMessage,
  messageSpec
} from './firebase';

const firebase = firebaseProvider(firebaseConfig);

firebase.then(instance => {
  firebaseGetRooms(instance).then(rooms => console.log(rooms));
  firebaseGetAllMessages(instance, 'general', snap => console.log(snap.val()));
  return instance;
}).then(instance => {
    window.setTimeout(() => {
    firebaseGetLastMessage(instance, 'general', snap =>
      { console.log('listener', snap.val()); });
    }, 5000);
    return instance;
}).then(instance => {
    window.setTimeout(() => {
      firebasePushMessage(instance, 'general', messageSpec);
    }, 7000);
});

import './index.css';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
