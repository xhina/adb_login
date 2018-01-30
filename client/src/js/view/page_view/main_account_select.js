import React from 'react';
import { Container, Button, Row } from 'reactstrap';

import BaseView from './base_view';

import {
  login as kakaoLogin,
  checkOAuthSession as checkKakaoSess,
  getUserInfo as getKakaoInfo,
  checkOAuthValid as checkOAuthValidKakao
} from '../../login/kakao';

import {
  login as fbLogin,
  checkOAuthSession as checkFbSess,
  getUserInfo as getFbInfo,
  checkOAuthValid as checkOAuthValidFB
} from '../../login/facebook';

class View extends BaseView {

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
      checkOAuthValidKakao() ? getKakaoInfo(this.onRequestFinishKakao.bind(this)) : super.visibleIndicator(false) ;
    }
    else if (checkFbSess()) {
      super.visibleIndicator(true);
      checkOAuthValidFB() ? getFbInfo(this.onRequestFinishFacebook.bind(this)) : super.visibleIndicator(false);
    }
  }

  onRequestFinishFacebook(res) {
    if (res.error) {
      super.visibleIndicator(false);
      super.errorAlert();
      return;
    }
    this.callJoinAPI(super.api.ACCOUNT_TYPE.FACEBOOK, res.id, res.email, res.name);
  }

  onRequestFinishKakao(res) {
    if (res.error) {
      super.visibleIndicator(false);
      super.errorAlert();
      return;
    }
    this.callJoinAPI(super.api.ACCOUNT_TYPE.KAKAO, res.id, res.kaccount_email, res.properties.nickname);
  }

  callJoinAPI(accountType, id, email, name) {
    super.visibleIndicator(true);
    super.api.snsJoin(accountType, id, email, name,
      (r)=>{
        super.visibleIndicator(false);
        if (r.error) {
          super.errorAlert(r.res_code);
          return;
        }
        this.joinComplete(r.data.access_token, email, name);
      });
  }

  joinComplete(token, email, name) {
    super.sendAccountInfoToFuse(token, email, name);
  }

  onClose() {
    super.sendCloseMsgToFuse();
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
              <Button id="kakao_btn"
                      onClick={this.startWithKakao}>
                      <div className="icon" />
                      <p>{super.getString('ui_start_kakao')}</p>
                    </Button>
            </Row>
            <Row className="justify-content-center">
              <Button id="fb_btn"
                      onClick={this.startWithFB}>
                      <div className="icon" />
                      <p>{super.getString('ui_start_fb')}</p>
                    </Button>
            </Row>
            <Row className="justify-content-center">
              <Button id="adb_btn"
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
