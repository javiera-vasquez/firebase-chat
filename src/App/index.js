import React, { Component } from 'react';
import Home from '../Home';
//import Chat from '../Chat';
import './App.css';

class App extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);

    this.state = {activeComponent: 'home'};
    this.handleComponentRedirect = this.handleComponentRedirect.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // Pass the form from home component and redirect to chat
  handleComponentRedirect(a) {
    console.log('redirect', a);
  }

  handleRedirect(activeComponent) {
    return activeComponent === 'home' ?
      <Home firebase={this.props.firebase} handleClick={this.handleComponentRedirect}/> :
      <p>soy un chat</p>
  }

  // render this component
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Firebase Chat</h4>
        </div>

        <div className="row center-xs">
          {this.handleRedirect('home')}
        </div>
      </div>
    );
  }
}

export default App;
