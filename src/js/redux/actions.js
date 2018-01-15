
/* action type */
export const LOGIN = "LOGIN";
export const CREATE = "CREATE";
export const LOGOUT = "LOGOUT";

export const Login = {
  ADB : "adb",
  FACEBOOK : "facebook",
  KAKAO : "kakao"
};

export const UserStatus = {
  GUEST : "guest",
  MEMBER : "member",
};

export const AccountType = {
  ADB : "adb",
  FACEBOOK : "facebook",
  KAKAO : "kakao",
};

export function loginAction(accountType, uid, pw) {
  return {
    type : LOGIN,
    accountType : accountType,
    uid : uid,
    pw : pw
  };
}

export function create(accountType) {
  return {
    type : CREATE,
    accountType : accountType
  };
}

export function logoutAction() {
  return {
    type : LOGOUT
  };
}
