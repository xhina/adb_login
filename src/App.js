import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, Go, PageUID} from './js/route/page-route-controller';
import StringResource from './js/string-resource';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location : ""
    };

    new StringResource(() => {
      SetRouteContainer(this);
      Go(PageUID.MAIN_ACCOUNT_SELECT);
    });
  }

  render() {
    const location = this.state.location;

    return (
      <Router>
        <div>
          <Route path="/" render={() => <div>{location}</div> } />
        </div>
      </Router>
    );
  }
}

export default App;
