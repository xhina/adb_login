import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Row } from 'reactstrap';

import BaseView from './base_view';
import img_logo from '../../res/img/logo.png';
import { ACCOUNT_TYPE, join } from '../redux/actions';
import { PAGE_UID } from '../route/page-component-factory';

import {
  login as kakaoLogin,
  checkOAuthSession as checkKakaoSess,
  getUserInfo as getKakaoInfo,
  checkOAuthError as checkOAuthErrorKakao
} from '../login/kakao';

import {
  login as fbLogin,
  checkOAuthSession as checkFbSess,
  getUserInfo as getFbInfo,
  checkOAuthError as checkOAuthErrorFb
} from '../login/facebook';

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  gotoCreateEmailAccount() {
    super.go(PAGE_UID.CREATE_EMAIL_ACCOUNT);
  }

  gotoServiceAgreement() {
    super.go(PAGE_UID.SERVICE_AGREEMENT);
  }

  gotoPrivacyPolicy() {
    super.go(PAGE_UID.PRIVACY_POLICY);
  }

  startWithFB() {
    fbLogin();
  }

  startWithKakao() {
    kakaoLogin();
  }

  componentDidMount() {
    if (checkKakaoSess()) {
      !checkOAuthErrorKakao() ? getKakaoInfo(this.onRequestFinishKakao.bind(this)) : null;
    }

    if (checkFbSess()) {
      !checkOAuthErrorFb() ? getFbInfo(this.onRequestFinishFacebook.bind(this)) : null;
    }
  }

  onRequestFinishFacebook(res) {
    console.log(res);
    if (res.error) {
      return;
    }
    this.dispatch(join(ACCOUNT_TYPE.FACEBOOK, res.id, res.email, res.name));
  }

  onRequestFinishKakao(res) {
    console.log(res);
    if (res.error) {
      return;
    }
    this.dispatch(join(ACCOUNT_TYPE.KAKAO, res.id, res.email, res.name));
  }

  render() {
    this.dispatch = this.props.dispatch;

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
                  onClick={this.gotoCreateEmailAccount.bind(this)}>이메일로 가입</Button>
              </Row>
              <Row className="justify-content-center">
                <Button style={btn_style} color="primary" onClick={this.startWithFB}>페이스북으로 가입</Button>
              </Row>
              <Row className="justify-content-center">
                <Button style={btn_style} color="warning" onClick={this.startWithKakao}>카카오톡으로 가입</Button>
              </Row>
            </div>
            <Container>
              <Row className="justify-content-center" style={{fontSize:'10pt', marginTop:"40px"}}>
                <p>가입과 동시에
                  <a href="#" onClick={this.gotoServiceAgreement}> 이용약관 </a>
                  및
                  <a href="#" onClick={this.gotoPrivacyPolicy.bind(this)}> 개인정보 보호정책</a>에 동의하신 것으로 간주됩니다.
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

export default connect()(View);
