/* action type */
export const LOGIN = "LOGIN";
export const JOIN = "JOIN";
export const DUID_SET = "DUID_SET";
export const DUID_LOAD = "DUID_LOAD";

export function login(accountType:Object, id:string, pw:string) {
  return {
    type : LOGIN,
    accountType : accountType,
    id : id,
    pw : pw,
  };
}

export function join(accountType:Object, id:string, pw:string, name:string) {
  return {
    type : JOIN,
    accountType : accountType,
    id : id,
    pw : pw,
    name : name,
  };
}

export function setDUID(duid:string) {
  return {
    type : DUID_SET,
    duid : duid
  };
}

export function loadDUID() {
  return {
    type : DUID_LOAD,
    duid : ""
  };
}
