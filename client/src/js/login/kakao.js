import _ from 'lodash';

const headers = new Headers({
  'Content-Type': 'application/json'
});

const redirect_uri = "http://localhost:3000/oauth_kakao";

export function login() {
  const url = "https://kauth.kakao.com/oauth/authorize?client_id=ea8fe6eb511b4caac7312ac1661e4fda&redirect_uri=" + redirect_uri + "&response_type=code";
  window.location.href = url;
}

export function checkOAuthSession() {
  const url = window.location.pathname;
  return (window.location.pathname === "/oauth_kakao") ? true : false;
}

export function getUserInfo() {
  const code = _.replace(window.location.search, "?code=", "");
  callAccessTokenAPI(code);
}

function callAccessTokenAPI(code) {
  const body = {
    url : "https://kauth.kakao.com/oauth/token",
    grant_type:"authorization_code",
    client_id:"ea8fe6eb511b4caac7312ac1661e4fda",
    redirect_uri:redirect_uri,
    code:code
  };

  fetch('http://localhost:3001/kakao_access_token',
  {method:'POST', headers:headers, body:JSON.stringify(body)})
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    getUserId(r.access_token);
  });
}

function getUserId(accessToken) {
  const body = {
    url : "https://kapi.kakao.com/v1/user/me",
    access_token : accessToken
  };

  fetch('http://localhost:3001/kakao_user_id',
  {method:'POST', headers:headers, body:JSON.stringify(body)})
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
  });
}
