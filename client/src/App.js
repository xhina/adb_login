import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, Go, PageUID, RoutePage} from './js/route/page-route-controller';
import StringResource from './js/string-resource';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userApi } from './js/redux/reducers';

let store = createStore(userApi);
const context = {};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location : "",
    };
    this.initAPP();
  }

  initAPP() {
    new StringResource(() => {
      SetRouteContainer(this);
      RoutePage(PageUID.MAIN_ACCOUNT_SELECT);
    });
    console.log(process.env);

    store.subscribe(()=> {
      console.log(store.getState());
    });
  }

  render() {
    const location = this.state.location;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={() => location } />
            <Route path="/oauth_kakao" render={() => location } />
            <Route path="/oauth_fb" render={() => location } />
            <Route path="/oauth_cancel_fb" render={() => location } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
