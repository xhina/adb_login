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
    const pw = document.querySelector("#pw").value;
    const pw_re = document.querySelector("#pw_re").value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    if (pw_re.length < 4 || pw_re.length > 12) {
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
      <div className="page" id="password_change_page">
        {super.attachHeader(super.getString('header_title_password_change'), "none", "none")}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <AdbInput label_title={super.getString("ui_password")} email_placeholder={super.getString("placeholder_input_pw")} />
              <AdbInput label_title={super.getString("ui_password_re")} email_placeholder={super.getString("placeholder_input_pw_re")} />

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
