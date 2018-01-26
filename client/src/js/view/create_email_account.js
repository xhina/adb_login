import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import BaseView from './base_view';

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.pageRender(this.view());
  }

  onSubmit(event) {
    event.preventDefault();
    const email = document.querySelector("#inputEmail").value;
    const pw = document.querySelector("#inputPassword").value;
    const name = document.querySelector("#inputUsername").value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    if (name.length < 2 || name.length > 16) {
      super.alert(super.getString("alert_name_limit"));
      return;
    }

    const aType = super.api.ACCOUNT_TYPE.ADB;
    super.api.join(aType, email, pw, name,
      (r)=>{
        if (r.error) {
          super.alert(super.getString(""));
          return;
        }
      }
    );
  }

  view() {
    return (
      <div className="page">
        {super.attachHeader(super.getString('header_title_email_join'))}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Row>
                  <Col xs='2'>
                    <Label for="email">이메일</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="email" name="email" id="email" placeholder={super.getString("placeholder_input_email")} required />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="pw">비밀번호</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="password" name="pw" id="pw" placeholder={super.getString("placeholder_input_pw")} required />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="userName">이름</Label>
                  </Col>
                  <Col xs='10'>
                    <Input name="userName" id="userName" placeholder={super.getString("placeholder_input_name")} required />
                  </Col>
                </Row>
              </FormGroup>
              <Row className="justify-content-center">
                <Button color="primary" size="lg">이메일로 가입하기</Button>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    );
  }

}

export default View;
