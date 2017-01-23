import React, { Component } from 'react';
import Home from '../Home';
import Chat from '../Chat';
import './App.css';

class App extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);
    this.state = {
      user: {name: ''},
      activeComponent: 'Home'
    };

    this.componentsList = ['Home', 'Chat'];
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // Pass the form from home component and redirect to chat
  handleHomeClick(user, componentName) {
    if(!user.name.length ) return;
    if(this.componentsList.indexOf(componentName) === -1) return;

    this.setState({
      user: user,
      activeComponent: componentName
    });
  }

  handleRedirect(activeComponent) {
    switch(activeComponent) {
      case 'Chat':
        return (
          <Chat
            user={this.state.user}
            firebase={this.props.firebase}
            handleClick={this.handleHomeClick}
          />
        );
      default:
        return (
          <Home
            user={this.state.user}
            firebase={this.props.firebase}
            handleClick={this.handleHomeClick}
          />
        );
    }
  }

  // render this component
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Firebase Chat</h4>
        </div>

        <div className="row center-xs">
          {this.handleRedirect(this.state.activeComponent)}
        </div>
      </div>
    );
  }
}

export default App;
