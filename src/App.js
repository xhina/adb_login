import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import {PageContainer, PageName} from './page-router'

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      location : ""
    }
    this.routingPage = this.routingPage.bind(this);
  }

  componentDidMount() {
    this.routingPage();
  }

  routingPage() {
    const page = PageContainer(PageName.MAIN_LOGIN);
    this.setState({location : page });
  }

  render() {
    const location = this.state.location;

    return (
      <div>
        {location}
      </div>
    )
  }
}

export default App;
