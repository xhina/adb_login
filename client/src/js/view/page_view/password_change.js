import React from 'react';
import BaseView from './base_view';
import AdbInput from '../component/adb-input';
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
    const pw = this.pw.value;
    const pw_re = this.pw_re.value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    if (pw_re.length < 4 || pw_re.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    if (pw_re !== pw) {
      super.alert(super.getString("alert_password_correct"));
      return;
    }

    super.api.passwordChange("token", pw,
      (r)=>{
        if (r.error) {
          super.errorAlert(r.res_code);
          return;
        }
      });
  }

  render() {
    return (
      <div className="page" id="password_change_page">
        {super.attachHeader(super.getString('header_title_password_change'), "none", "none")}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <AdbInput ref={e=>this.pw=e} type="password" label_title={super.getString("ui_password")} email_placeholder={super.getString("placeholder_input_pw")} />
              <AdbInput ref={e=>this.pw_re=e} type="password" label_title={super.getString("ui_password_re")} email_placeholder={super.getString("placeholder_input_pw_re")} />

              <Row className="justify-content-center">
                <Button><p>{super.getString("ui_modify")}</p></Button>
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
