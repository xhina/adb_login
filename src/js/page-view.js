import React, {Component} from 'react';
import BrowserHistory from './browser-history';
import {RoutePage} from './page-router';

const history = new BrowserHistory();

class PageView extends Component {
  constructor(props) {
    super(props);
  }

  go(pageName) {
    RoutePage(pageName);
    history.go(pageName);
  }

  goBack() {
    history.goBack();
  }
}

export default PageView;
