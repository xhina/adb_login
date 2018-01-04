import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, Go, PageUID} from './js/route/page-route-controller';
// import * as data from './test';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location : ""
    };
  }

  componentDidMount() {
    SetRouteContainer(this);
    Go(PageUID.TEMPORARY_PASSWORD);
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
