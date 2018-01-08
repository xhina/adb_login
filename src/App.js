import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, Go, PageUID} from './js/route/page-route-controller';
import StringResource from './js/string-resource';
import {Motion,spring} from 'react-motion';

class App extends Component {

  constructor(props) {
    super(props);
    this.pageInLocation = null;
    this.pageOutLocation = null;
    this.state = {
      location : "",
    };

    new StringResource(() => {
      SetRouteContainer(this);
      Go(PageUID.MAIN_ACCOUNT_SELECT);
    });
  }

  render() {
    this.state.location;

    return (
      <Router>
        <Route path="/" render={() => pageInTransition(this.pageInLocation)} />
      </Router>
    );
  }
}

const pageInTransition = (location) => {
  return (
    <Motion id="pageIn" defaultStyle={{x:50, scale:2}} style={{x:spring(0)}}>
      {
        ({x}) =>
            <div style={{
              transform:`translate3d(${x}px, 0, 0)`
            }}>{location}</div>
      }
    </Motion>
  );
};

const pageOutTransition = (location) => {
  return (
    <Motion id="pageIn" defaultStyle={{x:0}} style={{x:spring(-100)}}>
      {
        ({x}) =>
            <div style={{
                transform:`translate3d(${x}px, 0, 0)`,
              }}>{location}</div>
      }
    </Motion>
  );
};

export default App;
