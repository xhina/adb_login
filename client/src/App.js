import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {SetRouteContainer, Go, PageUID} from './js/route/page-route-controller';
import StringResource from './js/string-resource';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { userApi } from './js/redux/reducers';

let store = createStore(userApi);

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
      Go(PageUID.MAIN_ACCOUNT_SELECT);
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
            <Route path="/oauth" render={() => location } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
