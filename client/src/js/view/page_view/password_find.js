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
import AdbInput from '../component/adb-input';
import AdbButton from '../component/adb-button';

class View extends BaseView {

  componentDidMount() {
    super.pageRender(this.view());
  }

  gotoPasswordSearchPage() {
    super.go(super.pageUID.PASSWORD_SEARCH);
  }

  gotoJoinPage() {
    super.go(super.pageUID.CREATE_EMAIL_ACCOUNT);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value;

    super.visibleIndicator(true);
    super.api.passwordFind(email,
      (r)=>{
        super.visibleIndicator(false);
        if (r.error) {
          super.errorAlert(r.res_code);
          return;
        }
        super.alert(super.getString("alert_password_sending_mail"));
      });
  }

  onChangeInput(e) {
    if (e.target.value.length < 1) {
      this.btn.lock();
    }
    else {
      this.btn.unlock();
    }
  }

  view() {
    return (
      <div className="page" id="password_find_page">
        {super.attachHeader(super.getString('header_title_password_search'))}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <AdbInput ref={e=>this.email=e} onChange={this.onChangeInput.bind(this)} type="email" label_title={super.getString("ui_email")} email_placeholder={super.getString("placeholder_input_email")} />

              <Row className="justify-content-center">
                <AdbButton ref={e=>this.btn=e}><p>{super.getString("ui_send")}</p></AdbButton>
                <p id="footer_msg">{super.getString("ui_send_notice_msg")}</p>
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
