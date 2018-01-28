import React from 'react';
import { Container, Button, Row } from 'reactstrap';

import BaseView from './base_view';

import {
  login as kakaoLogin,
  checkOAuthSession as checkKakaoSess,
  getUserInfo as getKakaoInfo,
  checkOAuthError as checkOAuthErrorKakao
} from '../../login/kakao';

import {
  login as fbLogin,
  checkOAuthSession as checkFbSess,
  getUserInfo as getFbInfo,
  checkOAuthError as checkOAuthErrorFb
} from '../../login/facebook';

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  gotoCreateEmailAccount() {
    super.go(super.pageUID.LOGIN);
  }

  gotoServiceAgreement() {
    super.go(super.pageUID.SERVICE_AGREEMENT);
  }

  gotoPrivacyPolicy() {
    super.go(super.pageUID.PRIVACY_POLICY);
  }

  startWithFB() {
    fbLogin();
  }

  startWithKakao() {
    kakaoLogin();
  }

  componentDidMount() {
    if (checkKakaoSess()) {
      super.visibleIndicator(true);
      if (!checkOAuthErrorKakao()) {
        getKakaoInfo(this.onRequestFinishKakao.bind(this));
      }
      else {
        super.visibleIndicator(false);
      }
    }
    else if (checkFbSess()) {
      super.visibleIndicator(true);
      if (!checkOAuthErrorFb()) {
        getFbInfo(this.onRequestFinishFacebook.bind(this));
      }
      else {
        super.visibleIndicator(false);
      }
    }
  }

  onRequestFinishFacebook(res) {
    if (res.error) {
      super.visibleIndicator(false);
      return;
    }
    super.visibleIndicator(true);

    super.api.join(super.api.ACCOUNT_TYPE.FACEBOOK, res.id, res.email, res.name, (r)=>{
      super.visibleIndicator(false);
      if (r.error) {
        super.alert(super.getString('login error'));
        return;
      }
    });
  }

  onRequestFinishKakao(res) {
    if (res.error) {
      super.visibleIndicator(false);
      return;
    }

    super.visibleIndicator(true);

    super.api.join(super.api.ACCOUNT_TYPE.KAKAO, res.id, res.email, res.name, (r)=>{
      super.visibleIndicator(false);
      if (r.error) {
        super.alert(super.getString('login error'));
        return;
      }
    });
  }

  render() {
    return (
      <div className="page">
        { super.attachHeader('') }
        { super.attachAlertModal() }
        
        <div className="pre-scrollable">
          <Container>
            <Row className="justify-content-center">
              <img alt="logo" src={super.img.logo} />
            </Row>
            <div style={btn_group}>
              <Row className="justify-content-center">
                <Button style={btn_style} color="info"
                  onClick={this.gotoCreateEmailAccount.bind(this)}>{super.getString('ui_start_email')}</Button>
              </Row>
              <Row className="justify-content-center">
                <Button style={btn_style} color="primary" onClick={this.startWithFB}>{super.getString('ui_start_fb')}</Button>
              </Row>
              <Row className="justify-content-center">
                <Button style={btn_style} color="warning" onClick={this.startWithKakao}>{super.getString('ui_start_kakao')}</Button>
              </Row>
            </div>
            <Container>
              <Row className="justify-content-center" style={{fontSize:'10pt', marginTop:"40px"}}>
                <p>{super.getString("ui_policy_msg_0")}
                  <a href="#" onClick={this.gotoServiceAgreement}> {super.getString("ui_policy_msg_1")} </a>
                  {super.getString("ui_policy_msg_2")}
                  <a href="#" onClick={this.gotoPrivacyPolicy.bind(this)}> {super.getString("ui_policy_msg_3")}</a>
                  {super.getString("ui_policy_msg_4")}
                </p>
              </Row>
            </Container>
          </Container>
        </div>
      </div>
    );
  }
}

const btn_style = {
  'margin': '.2em 0',
  'width': '15em'
};

const btn_group = {
  marginTop: '4em',
  marginBottom: '1em'
}

export default View;
