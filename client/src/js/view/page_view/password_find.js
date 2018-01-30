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

    super.api.passwordFind(email,
      (r)=>{
        if (r.error) {
          super.errorAlert(r.res_code);
          return;
        }
        super.alert(super.getString("alert_password_sending_mail"));
      });
  }

  view() {
    return (
      <div className="page" id="password_find_page">
        {super.attachHeader(super.getString('header_title_password_search'))}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <AdbInput ref={e=>this.email=e} type="email" label_title={super.getString("ui_email")} email_placeholder={super.getString("placeholder_input_email")} />

              <Row className="justify-content-center">
                <Button><p>{super.getString("ui_send")}</p></Button>
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
