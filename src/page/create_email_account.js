import React, {Component} from 'react';
import BaseView from './base_view';

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>{ "create_email_account : " + window.location.hash }</h1>
    )
  }
}

export default View;
