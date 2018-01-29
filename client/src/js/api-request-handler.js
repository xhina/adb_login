import { getUserData } from './user-data';

const headers = new Headers({
  // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  // 'Content-Type': 'application/json',
});

const SERVER_ADDRESS = "https://apidev.doralab.co.kr";

const API_URL = {
  join : SERVER_ADDRESS + "/adb/account/join",
  login : SERVER_ADDRESS + "/adb/account/accountLogin",
  send_password : SERVER_ADDRESS + "/adb/account/findEmail",
  change_password : SERVER_ADDRESS + "/adb/account/findReset",
}

export const ACCOUNT_TYPE = {
  ADB : "adb",
  FACEBOOK : "facebook",
  KAKAO : "kakao",
};

export function login(accountType, id, pw, callback) {
  request(API_URL.login, {email:id,  password:pw, signup_path:accountType}, callback);
}

export function join(accountType, id, pw, name, callback) {
  request(API_URL.join, {"signup_id":id.toString(), "password":pw.toString(), "signup_name":name.toString(), "signup_path":accountType.toString()},
    (res)=>{
      if (res.error) {
        callback(res);
        return;
      }
      // login process로 진행
    });
}

export function passwordFind(email) {

}

export function passwordChange(pw) {

}

function mergeParams(arg) {
  const userData = getUserData();
  let body = {
    "client_uid" : userData.duid,
    "os" : userData.os,
    ...arg
  };
  // return body;

  const data = new URLSearchParams();
  for(var obj in body) {
    let key = obj;
    let value = body[obj];
    data.append(key, value);
    console.log(key, value);
  }
  return data;
}

function request(url, params, callback) {
  let body = mergeParams(params);
  console.log("request : ", url);

  fetch(url, {method:'POST', body:body})
  .then(r=>{
    let data = r.json();
    console.log(data);
    callback({error:!r.res === 0, data:data});
  })
  .catch(r=>{
    callback({error:true, data:r});
  });
}
