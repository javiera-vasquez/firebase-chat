import React, { Component } from 'react';
import Home from '../Home';
import Chat from '../Chat';
import './App.css';

class App extends Component {
  // ES6 class constructor
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      activeComponent: 'home'
    };

    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // Pass the form from home component and redirect to chat
  handleHomeClick(user) {
    if(!user.name.length ) return;

    this.setState({
      user: user,
      activeComponent: 'chat'
    });
  }

  handleRedirect(activeComponent) {
    return activeComponent === 'home' ?
      <Home firebase={this.props.firebase} handleClick={this.handleHomeClick}/> :
      <Chat firebase={this.props.firebase} user={this.state.user}/>
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
