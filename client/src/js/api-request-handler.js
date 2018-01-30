import { getUserData } from './user-data';

const headers = new Headers({
  // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  // 'Content-Type': 'application/json',
});

const SERVER_ADDRESS = "https://apidev.doralab.co.kr";

const API_URL = {
  join : SERVER_ADDRESS + "/adb/account/join",
  login : SERVER_ADDRESS + "/adb/account/login",
  send_password : SERVER_ADDRESS + "/adb/account/pwEmail",
  change_password : SERVER_ADDRESS + "/adb/account/pwChange",
  check_password_change_token : SERVER_ADDRESS + "/adb/account/checkToken",
}

export const ACCOUNT_TYPE = {
  ADB : "adb",
  FACEBOOK : "facebook",
  KAKAO : "kakao",
};

function convertParameter(arg) {
  const userData = getUserData();
  let body = {
    "client_uid" : userData.duid,
    "os" : userData.os,
    ...arg
  };

  const data = new URLSearchParams();
  for(var obj in body) {
    let key = obj;
    let value = body[obj];
    data.append(key, value);
    console.log(key, value);
  }
  return data;
}

export function login(accountType, id, pw, callback) {
  request(API_URL.login, {signup_id:id,  password:pw, signup_path:accountType}, callback);
}

export function join(id, pw, name, callback) {
  request(API_URL.join, {signup_id:id, password:pw, signup_name:name, signup_path:ACCOUNT_TYPE.ADB},
    (res)=>{
      callback(res);
    });
}

export function snsJoin(accountType, id, email, name, callback) {
  request(API_URL.join, {signup_id:id, sns_email:email, signup_name:name, signup_path:accountType},
    (res)=>{
      if (!res.error) {
        callback(res);
        return;
      }
      res.res_code == -200001 ? login(accountType, id, "", callback) : callback(res);
    });
}

export function passwordFind(email, callback) {
  request(API_URL.send_password, {signup_path:"adb", signup_id:email}, callback);
}

export function checkPasswordChangeToken(token, callback) {
  request(API_URL.check_password_change_token, {signup_token:token}, callback);
}

export function passwordChange(token, pw, callback) {
  request(API_URL.change_password, {signup_token:token, signup_pass:pw}, callback);
}

function request(url, params, callback) {
  console.log("request : ", url);
  let body = convertParameter(params);

  fetch(url, {method:'POST', body:body})
  .then(r=>r.json())
  .then(r=>{
    console.log(r);
    if (callback == null) return;
    callback({error:r.res !== 0, res_code:r.res, data:r.data});
  })
  .catch(r=>{
    callback({error:true, data:r});
  });
}
