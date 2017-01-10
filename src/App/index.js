import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Firebase Chat</h4>
        </div>

        <div className="row center-xs">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              ...child.props,
              firebase: this.props.route.firebase
            });
          })}
        </div>
      </div>
    );
  }
}

export default App;

