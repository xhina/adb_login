import React, {Component} from 'react';

const style = {
  position:'absolute',
  margin:'100px'
}

class View extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 style={style}>{ "main_create_account_type : " + window.location.hash }</h1>
    )
  }
}

export default View;
