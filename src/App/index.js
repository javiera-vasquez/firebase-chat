import React, { Component } from 'react';
import { firebaseConfig, firebaseProvider,} from '../firebase';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {firebase: {}};
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Firebase Chat</h4>
        </div>

        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            ...child.props,
            firebase:  this.props.route.firebase
          });
        })}

      </div>
    );
  }
}

export default App;

