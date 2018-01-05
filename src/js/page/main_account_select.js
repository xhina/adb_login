import React from 'react';
import Page from '../page';
import {Container, Button, Row, Col} from 'reactstrap';
import img_logo from '../../res/img/logo.png';
import {PageUID} from '../route/page-route-controller';

class View extends Page {

  constructor(props) {
    super(props);
  }

  gotoCreateEmailAccountPage() {
    super.go(PageUID.CREATE_EMAIL_ACCOUNT);
  }

  render() {
      return (
      <div>
        { super.attachHeader('') }
        <Container>
          <Row className="justify-content-center">
            <img src={img_logo}/>
          </Row>
          <div style={btn_group}>
            <Row className="justify-content-center">
              <Button style={btn_style} color="info"
                      onClick={this.gotoCreateEmailAccountPage}>이메일로 가입</Button>
            </Row>
            <Row className="justify-content-center">
              <Button style={btn_style} color="primary">페이스북으로 가입</Button>
            </Row>
            <Row className="justify-content-center">
              <Button style={btn_style} color="warning">카카오톡으로 가입</Button>
            </Row>
          </div>
          <Row className="justify-content-center">
            <p>가입과 동시에
              <a href="www.naver.com"> 이용약관 </a>
               및
              <a href="www.daum.net"> 개인정보 보호정책</a>에 동의하신 것으로 간주됩니다.
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
