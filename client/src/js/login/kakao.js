export function KakaoLogin() {
  const url = "https://kauth.kakao.com/oauth/authorize?client_id=ea8fe6eb511b4caac7312ac1661e4fda&redirect_uri=http://localhost:3000/oauth&response_type=code";
  window.location.href = url;
}

export function KakaoToken(code) {
  const params = {
    grant_type:"authorization_code",
    client_id:"ea8fe6eb511b4caac7312ac1661e4fda",
    redirect_uri:"http://localhost:3000/oauth",
    code:code
  };

  const body = {
    url : "https://kauth.kakao.com/oauth/token",
    params : params
  }

  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  fetch('http://localhost:3001/token',
  {method:'POST', headers:headers, body:JSON.stringify(body)})
  .then((res) => res.json())
  .then((res) => {
      console.log(res);
  });
}
