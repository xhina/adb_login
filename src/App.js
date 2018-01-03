import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, PageName, RoutePage, EntryPage} from './js/page-router';
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
    RoutePage(EntryPage);
  }

  render() {
    const location = this.state.location;

    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <div>{location}</div> } />
        </div>
      </Router>
    );
  }
}

export default App;
