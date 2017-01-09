// Deps
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//service
import { firebaseConfig, firebaseProvider,} from './firebase';
// Components
import App from './App';
import Home from './home';
// Styles
import './index.css';

const firebase = firebaseProvider(firebaseConfig);

firebase.then(instance => {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" firebase={instance} component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
    ),
    document.getElementById('root')
  );
});


