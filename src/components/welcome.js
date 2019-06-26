import React, {Component} from 'react'
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name} , {this.props.email}</h1>;
  }
}


export default Welcome