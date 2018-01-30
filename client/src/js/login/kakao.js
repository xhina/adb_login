import _ from 'lodash';

const headers = new Headers({
  'Content-Type': 'application/json'
});

const redirect_uri = "http://localhost:3000/oauth_kakao";
const client_id = "4407549812527c7efe311010a276073c";

export function login() {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  window.location.href = url;
}

export function checkOAuthSession() {
  const url = window.location.pathname;
  return (window.location.pathname === "/oauth_kakao") ? true : false;
}

export function checkOAuthValid() {
  const bool = window.location.search.includes("error");
  return !bool;
}

export function getUserInfo(callback) {
  const code = _.replace(window.location.search, "?code=", "");
  callAccessTokenAPI(code, callback);
}

function callAccessTokenAPI(code, callback) {
  const body = {
    url : "https://kauth.kakao.com/oauth/token",
    grant_type:"authorization_code",
    client_id:client_id,
    redirect_uri:redirect_uri,
    code:code
  };

  fetch('http://localhost:3001/kakao_access_token',
  {method:'POST', headers:headers, body:JSON.stringify(body)})
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    if (r.error != null) {
      callback({error:1});
      return;
    }
    getUserId(r.access_token, callback);
  });
}

function getUserId(accessToken, callback) {
  const body = {
    url : "https://kapi.kakao.com/v1/user/me",
    access_token : accessToken
  };

  fetch('http://localhost:3001/kakao_user_id',
  {method:'POST', headers:headers, body:JSON.stringify(body)})
  .then((r) => r.json())
  .then((r) => {
    if (r.error != null) {
      callback({error:1});
      return;
    }
    callback({...r});
  });
}
