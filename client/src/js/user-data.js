import { DUID_SET, DUID_LOAD } from './redux/actions';

let userData;

export function getUserData() {
  if (userData == null) {
    userData = new UserData();
  }
  return userData;
}

class UserData {
  constructor() {
    this.data = {};
    this.data.duid = "";
  }

  set duid(duid) {
    this.data.duid = duid;
    localStorage.setItem('duid', duid);
    console.log('set', duid);
  }

  get duid() {
    return this.data.duid;
  }

  loadDuid() {
    let duid = localStorage.getItem('duid');
    if (duid == null) {
      duid = Math.abs(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    this.duid = duid;
  }

  get os() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      if (/Android/i.test(navigator.userAgent)) return "android";
      else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return "ios";
      else return "mobile_etc"
    }
    else {
      return "web";
    }
  }

  setReduxState(state) {
    this.data.state = state;
    if (state.type == DUID_SET) {
      this.duid = state.duid;
    }
    else if (state.type == DUID_LOAD) {
      this.loadDuid();
    }
  }
}
