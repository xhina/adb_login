import React from 'react';
import BaseView from './base_view';
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

class View extends BaseView {

  gotoPasswordSearchPage() {
    super.go(super.pageUID.PASSWORD_SEARCH);
  }

  gotoJoinPage() {
    super.go(super.pageUID.CREATE_EMAIL_ACCOUNT);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = document.querySelector("#inputEmail").value;
    const pw = document.querySelector("#inputPassword").value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    super.api.passwordChange(pw,
      (r)=>{
        if (r.error) {
          super.alert(super.getString("alert_not_member"));
          // or 이미 가입된 계정 alert message 추가
          return;
        }
      });
  }

  render() {
    return (
      <div className="page">
        {super.attachHeader(super.getString('header_title_password_change'), "none", "none")}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>

              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="password">{super.getString("ui_password")}</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="password" id="password" placeholder={super.getString("placeholder_input_pw")} required/>
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="passwordRe">{super.getString("ui_password_re")}</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="password" id="passwordRe" placeholder={super.getString("placeholder_input_pw_re")} required/>
                  </Col>
                </Row>
              </FormGroup>

              <Row className="justify-content-center">
                <Button color="primary" size="lg">{super.getString("ui_modify")}</Button>
              </Row>
            </Form>

          </Container>
        </div>
      </div>
    );
  }
}

const btn_style = {
  'margin': '.2em 0',
  'width':'15em'
};

export default View;
