// @flow

/* action type */
export const LOGIN = "LOGIN";
export const CREATE = "CREATE";
export const LOGOUT = "LOGOUT";
export const DUID_SET = "DUID_SET";
export const DUID_GET = "DUID_GET";

export const UserStatus = {
  GUEST : "guest",
  MEMBER : "member",
};

export const AccountType = {
  ADB : "adb",
  FACEBOOK : "facebook",
  KAKAO : "kakao",
};

export function loginAction(accountType:Object, uid:string, pw:string) {
  return {
    type : LOGIN,
    accountType : accountType,
    uid : uid,
    pw : pw
  };
}

export function create(accountType:Object) {
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

export function setDUID(duid:string) {
  return {
    type : DUID_SET
  };
}

export function getDUID() {
  return {
    type : DUID_GET
  };
}
