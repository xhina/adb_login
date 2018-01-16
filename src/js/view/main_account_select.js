import React from 'react';
import BaseView from './base_view';
import { Container, Button, Row } from 'reactstrap';
import img_logo from '../../res/img/logo.png';
import { PageUID } from '../route/page-route-controller';
import { ImageRes } from '../res-link';
import _ from 'lodash';
import { KakaoLogin, KakaoToken } from '../login/kakao';

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

  }

  startWithKakao() {
    KakaoLogin();
  }

  componentDidMount() {
    const code = _.replace(window.location.search, '?code=', '').toString();
    if (code == "") return;
    KakaoToken(code)
  }

  render() {
    return (
      <React.Fragment>

        { super.attachHeader('') }
        { super.attachAlertModal() }

        <Container>
          <Row className="justify-content-center">
            <img alt="" src={super.img.logo}/>
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
          <Row className="justify-content-center">
            <p>가입과 동시에
              <a href="#" onClick={this.gotoServiceAgreement}> 이용약관 </a>
              및
              <a href="#" onClick={this.gotoPrivacyPolicy}> 개인정보 보호정책</a>에 동의하신 것으로 간주됩니다.
            </p>
          </Row>
        </Container>
      </React.Fragment>
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
