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
    if (r.error != null) {
      callback({error:1});
      return;
    }
    getUserId(r.access_token, callback);
  });
}

function getUserId(accessToken, callback) {
  fetch("https://graph.facebook.com/v2.11/me?fields=id,name,email" + "&access_token=" + accessToken,
  {method:'GET'})
  .then((r) => r.json())
  .then((r) => {
    console.log(r);
    if (r.error != null) {
      callback({error:1});
      return;
    }
    callback({...r});
  });
}
