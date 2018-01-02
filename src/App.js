import React, {Component} from 'react';
import {Router, PageName, RoutePage, EntryPage} from './js/page-router';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location : ""
    };
  }

  componentDidMount() {
    Router.ConnectRouteContainer(this);
    RoutePage(EntryPage);
  }

  render() {
    const location = this.state.location;

    return (
      <div>
        { location }
      </div>
    );
  }
}

export default App;
