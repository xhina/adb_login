import React from 'react';
import BaseView from './base_view';
import { Container, Button, Row } from 'reactstrap';
import img_logo from '../../res/img/logo.png';
import { PageUID } from '../route/page-route-controller';
import _ from 'lodash';
import { login as kakaoLogin, checkOAuthSession as checkKakaoSess, getUserInfo as getKakaoInfo, checkOAuthError as checkOAuthErrorKakao } from '../login/kakao';
import { login as fbLogin, checkOAuthSession as checkFbSess, getUserInfo as getFbInfo, checkOAuthError as checkOAuthErrorFb } from '../login/facebook';

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  gotoCreateEmailAccount() {
    super.go(PageUID.CREATE_EMAIL_ACCOUNT);
  }

  gotoServiceAgreement() {
    super.go(PageUID.SERVICE_AGREEMENT);
  }

  gotoPrivacyPolicy() {
    super.go(PageUID.PRIVACY_POLICY);
  }

  startWithFB() {
    fbLogin();
  }

  startWithKakao() {
    kakaoLogin();
  }

  componentDidMount() {
    if (checkKakaoSess()) {
      !checkOAuthErrorKakao() ? getKakaoInfo() : null;
    }

    if (checkFbSess()) {
      !checkOAuthErrorFb() ? getFbInfo() : null;
    }
  }

  render() {
    return (
      <div className="page">
        { super.attachHeader('') }
        { super.attachAlertModal() }

        <Container className="pre-scrollable">
          <Row className="justify-content-center">
            <img alt="logo" src={super.img.logo} />
          </Row>
          <div style={btn_group}>
            <Row className="justify-content-center">
              <Button style={btn_style} color="info"
                onClick={this.gotoCreateEmailAccount.bind(this)}>이메일로 가입</Button>
            </Row>
            <Row className="justify-content-center">
              <Button style={btn_style} color="primary" onClick={this.startWithFB}>페이스북으로 가입</Button>
            </Row>
            <Row className="justify-content-center">
              <Button style={btn_style} color="warning" onClick={this.startWithKakao}>카카오톡으로 가입</Button>
            </Row>
          </div>
          <Row className="justify-content-center" style={{fontSize:'10pt'}}>
            <p>가입과 동시에
              <a href="#" onClick={this.gotoServiceAgreement}> 이용약관 </a>
              및
              <a href="#" onClick={this.gotoPrivacyPolicy}> 개인정보 보호정책</a>에 동의하신 것으로 간주됩니다.
            </p>
          </Row>
        </Container>
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
