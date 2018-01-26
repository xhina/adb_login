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
  }

  get duid() {
    return this.data.duid;
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
    console.log(state);
  }
}
