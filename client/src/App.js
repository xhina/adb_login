import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, Go, PageUID, RoutePage} from './js/route/page-route-controller';
import StringResource from './js/string-resource';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userApi } from './js/redux/reducers';
import _ from 'lodash';

let store = createStore(userApi);
const context = {};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      renderHash : "",
    };
    this.initAPP();
  }

  initAPP() {
    this.renderTree =[];

    new StringResource(() => {
      SetRouteContainer(this);
      RoutePage(PageUID.MAIN_ACCOUNT_SELECT);
    });
    console.log(process.env);

    store.subscribe(()=> {
      console.log(store.getState());
    });
  }

  renderTrigger() {
    this.setState({renderHash:_.random(Number.MAX_SAFE_INTEGER)});
  }

  addRender(page) {
    if (page == null) return;
    this.renderTree.push(page);
  }

  removeRender() {
    this.renderTree = _.dropRight(this.renderTree);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getRenderElements() {
    return this.renderTree.map((el)=>el);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={() => this.getRenderElements()} />
            <Route exact path="/oauth_kakao" render={() => this.getRenderElements()} />
            <Route exact path="/oauth_fb" render={() => this.getRenderElements()} />
            <Route exact path="/oauth_cancel_fb" render={() => this.getRenderElements()} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
