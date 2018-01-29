import { getUserData } from './user-data';

const headers = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'*',
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
  request(API_URL.join, {signup_id:id, password:pw, signup_name:name, signup_path:accountType},
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
    client_uid : userData.duid,
    os : userData.os,
    ...arg
  };
  return body;
}

function request(url, params, callback) {
  let body = mergeParams(params);
  console.log("request : ", url, body);

  fetch(url, {method:'POST', mode:'cors', headers:headers, body:JSON.stringify(body)})
  .then(r=>{
    let data = JSON.parse(r);
    callback({error:!r.res === 0, data:data});
  })
  .catch(r=>{
    callback({error:true, data:r});
  });
}
