import React from 'react';
import BaseView from './base_view';
import AdbInput from '../component/adb-input';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
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
    const email = this.email.value;
    const pw = this.pw.value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    super.visibleIndicator(true);

    super.api.login(super.api.ACCOUNT_TYPE.ADB, email, pw,
      (r)=>{
        super.visibleIndicator(false);
        if (r.error) {
          super.errorAlert(r.res_code);
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

              <AdbInput ref={e=>this.email=e} type="email" label_title={super.getString("ui_email")} email_placeholder={super.getString("placeholder_input_email")} />
              <AdbInput ref={e=>this.pw=e} type="password" label_title={super.getString("ui_password")} email_placeholder={super.getString("placeholder_input_pw")} />

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
              <p className="menu_separator"></p>
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
