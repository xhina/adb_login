import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import transition_css from './page_transition.css'
import {PageContainer, PageName} from './page-router'

const Home = () => <h3>Home</h3>;

class App extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      location : [<Home />]
    }
    this.routingPage = this.routingPage.bind(this);
  }

  routingPage() {
    const c = this.state.location.concat([]);
    c.pop();
    const d = c.concat([PageContainer(PageName.MAIN_LOGIN)]);
    this.setState({location : d });
  }

  render() {
    const location = this.state.location;

    return (
      <div>
      <button onClick={this.routingPage}>click</button>

        <CSSTransitionGroup
          transitionName="page"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
            {location}
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default App;
