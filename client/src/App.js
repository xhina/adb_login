import React, {Component} from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {BindRouteContainer, RoutePage} from './js/route/page-route-controller';
import {PAGE_UID} from './js/route/page-component-factory';
import StringResource from './js/string-resource';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userApi } from './js/redux/reducers';
import { setDUID, loadDUID } from './js/redux/actions';
import { getUserData } from './js/user-data';

let store = createStore(userApi);
store.subscribe(()=> {
  getUserData().setReduxState(store.getState());
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderHash : "",
    };
    this.initAPP();
  }

  initAPP() {
    this.initRender();
    this.setDeviceUID();
    new StringResource(() => {
      BindRouteContainer(this);
      this.setDefaultPage();
    });
    console.log(process.env);
  }

  setDefaultPage() {
    window.location.pathname.indexOf("pwchange") == -1 ? RoutePage(PAGE_UID.MAIN_ACCOUNT_SELECT) : RoutePage(PAGE_UID.PASSWORD_CHANGE);
  }

  initRender() {
    this.renderTree = [];
  }

  setDeviceUID() {
    let params = _.replace(window.location.search, "?", "");
    params = _.split(params, "&");

    _.map(params, (e)=>{
      let p = _.split(e, "=");
      if (p.length < 2) return false;

      const {k,v} = {k:p[0], v:p[1]};
      if (k === "duid") {
        store.dispatch(setDUID(v));
        return;
      }
    });
    store.dispatch(loadDUID());
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
            <Route exact path="/" render={() => this.getRenderElements()} />
            <Route exact path="/oauth_kakao" render={() => this.getRenderElements()} />
            <Route exact path="/oauth_fb" render={() => this.getRenderElements()} />
            <Route exact path="/oauth_cancel_fb" render={() => this.getRenderElements()} />
            <Route exact path="/pwchange" render={() => this.getRenderElements()} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
