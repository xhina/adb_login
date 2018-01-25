import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, PageUID, RoutePage} from './js/route/page-route-controller';
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
    this.setDeviceUID();
    new StringResource(() => {
      SetRouteContainer(this);
      RoutePage(PageUID.MAIN_ACCOUNT_SELECT);
    });
    store.subscribe(()=> {
      console.log('store',store.getState());
    });

    console.log(process.env);
  }

  setDeviceUID() {
    let params = _.words(window.location.search);
    let idx = _.indexOf(params, 'duid');
    if (idx == -1) {
      console.log('not set a {duid} value');
      return;
    }
    let duid = params[idx + 1];
    if (params.length % 2 != 0) {
      console.log('not paired key and value : ' + window.location.search);
    }
    console.log('DUID :', duid);
  }

  renderTrigger() {
    this.setState({renderHash:_.random(Number.MAX_SAFE_INTEGER)});
  }

  addRender(page) {
    if (page == null) return;
    this.renderTree.push(page);
  }

  removeRenderPop() {
    this.renderTree = _.dropRight(this.renderTree);
  }

  getRenderElements() {
    return this.renderTree.map((el)=>el);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" render={() => this.getRenderElements()} />

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
