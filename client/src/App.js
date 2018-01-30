import React, {Component} from 'react';
import _ from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { RoutePage } from './js/route/page-route-controller';
import { PAGE_UID } from './js/route/page-component-factory';
import StringResource from './js/string-resource';
import { userApi } from './js/redux/reducers';
import { setDUID, loadDUID } from './js/redux/actions';
import { getUserData } from './js/user-data';
import { RenderComponent } from './js/app-renderer';
import { init as initGlobalUI } from './js/view/component/global-ui';
import getParamFromURL from './js/util/parameterFromURL';

let store = createStore(userApi);
store.subscribe(()=> {
  getUserData().setReduxState(store.getState());
});

class App extends Component {
  constructor(props) {
    super(props);
    this.initAPP();
  }

  initAPP() {
    initGlobalUI();
    this.setDeviceUID();
    new StringResource(() => {
      this.setDefaultPage();
    });
    console.log(process.env);
  }

  setDefaultPage() {
    // RoutePage(PAGE_UID.PASSWORD_CHANGE);
    // return;
    window.location.pathname.indexOf("pwchange") == -1 ? RoutePage(PAGE_UID.MAIN_ACCOUNT_SELECT) : RoutePage(PAGE_UID.PASSWORD_CHANGE);
  }

  setDeviceUID() {
    const duid = getParamFromURL("duid");
    if (duid != null) store.dispatch(setDUID(duid));
    else store.dispatch(loadDUID());
  }

  render() {
    return (
      <Provider store={store}>
        {RenderComponent()}
      </Provider>
    );
  }
}

export default App;
