import React, { Component } from 'react';

export default class Home extends Component {

  componentDidMount(){
    this.props.OnHide()
    this.props.ShowMenuBar()
  }

  render(){
  return (
  
    <div>
      <p>Welcome to dashboard page</p>
    </div>
  );
  }
}
