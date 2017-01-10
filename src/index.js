// Deps
import React from 'react';
import ReactDOM from 'react-dom';
//service
import { firebaseConfig, firebaseProvider,} from './firebase';
// Components
import App from './App';
import './index.css';

const firebase = firebaseProvider(firebaseConfig);

firebase.then(instance => {
  ReactDOM.render(
    <App firebase={instance} />,
    document.getElementById('root')
  );
});


