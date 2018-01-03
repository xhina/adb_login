export default class BrowserHistory {
  constructor() {

  }

  go(page) {
    console.log('browser history', page.toString());
  }

  goBack() {
    console.log('browser history', 'go back');
  }
}
