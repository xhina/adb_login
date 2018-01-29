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

  componentDidMount() {
    super.pageRender(this.view());
  }

  gotoPasswordSearchPage() {
    super.go(super.pageUID.PASSWORD_FIND);
  }

  gotoJoinPage() {
    super.go(super.pageUID.JOIN_EMAIL);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const pw = document.querySelector("#pw").value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    super.visibleIndicator(true);

    const api = super.api;
    api.login(api.ACCOUNT_TYPE.ADB, email, pw,
      (r)=>{
        super.visibleIndicator(false);
        if (r.error) {
          super.alert(super.getString("alert_not_member"));
          // or 이미 가입된 계정 alert message 추가
          return;
        }
      });
  }

  view() {
    return (
      <div className="page" id="login_page">
        {super.attachHeader(super.getString('header_title_email_login'))}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Row>
                  <Col className="col_label">
                    <Label for="email">{super.getString("ui_email")}</Label>
                  </Col>
                  <Col className="col_input">
                    <Input type="email" id="email" placeholder={super.getString("placeholder_input_email")} required/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col className="col_label">
                    <Label for="pw">{super.getString("ui_password")}</Label>
                  </Col>
                  <Col className="col_input">
                    <Input type="password" id="pw" placeholder={super.getString("placeholder_input_pw")} required/>
                  </Col>
                </Row>
              </FormGroup>
              <Row className="justify-content-center">
                <Button color="primary">
                  <p>{super.getString("ui_login")}</p>
                </Button>
              </Row>
            </Form>

            <Row id="footer_menu">
              <Col className="text-right">
                <a href="#" onClick={this.gotoPasswordSearchPage}>{super.getString('ui_password_search')}</a>
              </Col>
              <p class="menu_separator"></p>
              <Col className="text-left">
                <a href="#" onClick={this.gotoJoinPage}>{super.getString('ui_join')}</a>
              </Col>
            </Row>

          </Container>
        </div>
      </div>
    );
  }
}

export default View;
