import {Component} from 'react';
import {Go, GoBack, GoBackEnable} from './page-route-controller';

class PageNavigator extends Component {

  go(pageUID) {
    Go(pageUID);
  }

  goBack() {
    GoBack();
  }

  close() {
    // fuse-bridge : close web modal
  }

  isGoBackEnable() {
    return GoBackEnable();
  }
}

export default PageNavigator;
