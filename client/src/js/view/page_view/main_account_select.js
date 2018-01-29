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

  startWithKakao() {
    kakaoLogin();
  }

  startWithFB() {
    fbLogin();
  }

  startWithEmail() {
    super.go(super.pageUID.LOGIN);
  }

  gotoServiceAgreement() {
    super.go(super.pageUID.SERVICE_AGREEMENT);
  }

  gotoPrivacyPolicy() {
    super.go(super.pageUID.PRIVACY_POLICY);
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

  onClose() {

  }

  render() {
    return (
      <div className="page" id="account_select_page">
        { super.attachAlertModal() }
        <div id="main_bg" className="justify-content-center"><div/></div>
        <div id="close_btn" onClick={this.onClose} />

        <Container>
          <Row className="justify-content-center">
            <div id="main_logo" alt="" />
          </Row>
          <div id="btn_group">
            <Row className="justify-content-center">
              <Button id="kakao_btn" color="info"
                      onClick={this.startWithKakao}>
                      <div className="icon" />
                      <p>{super.getString('ui_start_kakao')}</p>
                    </Button>
            </Row>
            <Row className="justify-content-center">
              <Button id="fb_btn" color="primary"
                      onClick={this.startWithFB}>
                      <div className="icon" />
                      <p>{super.getString('ui_start_fb')}</p>
                    </Button>
            </Row>
            <Row className="justify-content-center">
              <Button id="adb_btn" color="warning"
                      onClick={this.startWithEmail.bind(this)}>
                      <div className="icon" />
                      <p>{super.getString('ui_start_email')}</p>
                    </Button>
            </Row>
          </div>
        </Container>

        <Row className="justify-content-center">
          <p id="footer_text">{super.getString("ui_policy_msg_0")}
            <a href="#" onClick={this.gotoServiceAgreement}> {super.getString("ui_policy_msg_1")} </a>
            {super.getString("ui_policy_msg_2")}
            <a href="#" onClick={this.gotoPrivacyPolicy.bind(this)}> {super.getString("ui_policy_msg_3")}</a>
            {super.getString("ui_policy_msg_4")}
          </p>
        </Row>
      </div>
    );
  }
}

export default View;
