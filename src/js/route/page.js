import React from 'react';
import Navigator from './page-navigator';

export default class Page extends Navigator {

  constructor(props) {
    super(props);
    this.state = {
      hidden : false
    };
  }

  hidden() {
    this.setState({hidden:true});
  }

  isHidden() {
    return this.state.hidden;
  }


}
