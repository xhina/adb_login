import _ from 'lodash';

export default class BrowserHistory {
  constructor() {
    this.history = [];
  }

  go(page_uid) {
    let lastPage = _.last(this.history);
    // if (lastPage === page_uid) {
    //   console.log('cannot go to the duplicate page');
    //   return false;
    // }
    this.history.push(page_uid);
    return true;
  }

  goBack() {
    let list = this.history;
    let p = _.takeRight(list, 2);
    if (_.size(p) > 1) {
      list.pop();
      return _.last(list);
    }
    return null;
  }

  goBackEnable() {
    let list = this.history;
    return _.size(list) > 1;
  }

  current() {
    return _.last(this.history);
  }

}
