import _ from 'lodash';

const headers = new Headers({
  'Content-Type': 'application/json'
});

const redirect_uri = "http://localhost:3000/oauth_fb";

export function login() {
  const url = "https://www.facebook.com/v2.11/dialog/oauth?client_id=321710594985789&redirect_uri=" + redirect_uri + "&scope=email";
  window.location.href = url;
}

export function checkOAuthSession() {
  const url = window.location.pathname;
  return (window.location.pathname === "/oauth_fb") ? true : false;
}

export function successOAuthResult() {
  const bool = window.location.search.includes("error");
  return !bool;
}

export function getUserInfo() {
  const code = _.replace(window.location.search, "?code=", "");
  callAccessTokenAPI(code);
}

function callAccessTokenAPI(code) {
  const body = {
    url : "https://graph.facebook.com/v2.11/oauth/access_token",
    client_id:"321710594985789",
    redirect_uri:redirect_uri,
    code:code,
    app_secret:"3d28866b8839bc8373cd9961388878f7"
  };

  fetch(body.url + "?client_id="+body.client_id+"&redirect_uri="+body.redirect_uri+"&code="+body.code+"&client_secret="+body.app_secret,
  {method:'GET'})
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    getUserId(r.access_token);
  });
}

function getUserId(accessToken) {
  fetch("https://graph.facebook.com/v2.11/me?fields=id,name,email" + "&access_token=" + accessToken,
  {method:'GET'})
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
  });
}
