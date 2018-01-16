export function KakaoLogin() {
  const url = "https://kauth.kakao.com/oauth/authorize?client_id=ea8fe6eb511b4caac7312ac1661e4fda&redirect_uri=http://10.110.71.2:3000/oauth&response_type=code";
  window.location.href = url;
}

export function KakaoToken(code) {
  const body = {
    grant_type:"authorization_code",
    client_id:"ea8fe6eb511b4caac7312ac1661e4fda",
    redirect_uri:"http://10.110.71.2:3000/oauth",
    code:code
  };

  const headers = new Headers({
    'Content-Type':'application/json'
  });

  console.log(JSON.stringify(body));
  fetch("https://kauth.kakao.com/oauth/token", {method:'POST', mode:'cors', body:JSON.stringify(body)}).then((e)=>{
    console.log('success',e);
  });
}
