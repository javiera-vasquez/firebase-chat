import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  propsInChild() {console.log('props in Home', this.props)}

  render() {
    this.propsInChild();

    return (
      <div>
        <h2>Welcome to Home</h2>
        <h1>{ this.props.route.foo }</h1>
      </div>
    );
  }
}

export default Home