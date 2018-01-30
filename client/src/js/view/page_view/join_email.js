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

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.pageRender(this.view());
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    const pw = this.pw.value;
    const name = this.name.value;

    if (pw.length < 4 || pw.length > 12) {
      super.alert(super.getString("alert_password_limit"));
      return;
    }

    if (name.length < 2 || name.length > 16) {
      super.alert(super.getString("alert_name_limit"));
      return;
    }
    super.visibleIndicator(true);
    this.callJoinAPI(email,pw,name);
  }

  callJoinAPI(email, pw, name) {
    super.api.join(email, pw, name,
      (res)=>{
        super.visibleIndicator(false);
        if (res.error) {
          super.errorAlert(res.res_code);
          return;
        }
        this.joinComplete(res.data.access_token, email, res.data.account_name);
      }
    );
  }

  joinComplete(token, email, name) {
    super.sendAccountInfoToFuse(token, email, name);
  }

  onChangeInput(e) {
    const email = this.email.value;
    const pw = this.pw.value;
    const name = this.name.value;
    if (email.length < 1 || pw.length < 1 || name.length < 1) {
      this.btn.lock();
    }
    else {
      this.btn.unlock();
    }
  }

  view() {
    return (
      <div className="page" id="join_email_page">
        { super.attachHeader(super.getString('header_title_email_join')) }
        { super.attachAlertModal() }

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <AdbInput ref={e=>this.email=e} onChange={this.onChangeInput.bind(this)} type="email" label_title={super.getString("ui_email")} email_placeholder={super.getString("placeholder_input_email")} />
              <AdbInput ref={e=>this.pw=e} onChange={this.onChangeInput.bind(this)} type="password" label_title={super.getString("ui_password")} email_placeholder={super.getString("placeholder_input_pw")} />
              <AdbInput ref={e=>this.name=e} onChange={this.onChangeInput.bind(this)} type="name" label_title={super.getString("ui_name")} email_placeholder={super.getString("placeholder_input_name")} />

              <Row className="justify-content-center">
                <AdbButton ref={e=>this.btn=e}><p>{super.getString("ui_join")}</p></AdbButton>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    );
  }

}

export default View;
