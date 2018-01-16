import React from 'react';
import BaseView from './base_view';

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

  render() {
    return (
      <React.Fragment>
        <Container>
            
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
