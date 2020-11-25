import React from 'react';


class Homepage extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      )
    }
  }
  
export default Homepage;