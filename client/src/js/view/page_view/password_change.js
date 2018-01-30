import React from 'react';
import BaseView from './base_view';
import AdbInput from '../component/adb-input';
import AdbButton from '../component/adb-button';
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
import getParamFromURL from '../../util/parameterFromURL';

class View extends BaseView {

  constructor(props) {
    super(props);
    this.state = {
      buttonLock:true
    }
  }

  gotoPasswordSearchPage() {
    super.go(super.pageUID.PASSWORD_SEARCH);
  }

  gotoJoinPage() {
    super.go(super.pageUID.CREATE_EMAIL_ACCOUNT);
  }

  componentDidMount() {
    const token = getParamFromURL('signup_token');
    if (token == null) {
      super.alert(super.getString("alert_token_invalid"));
    }
    this.callCheckTokenAPI(token);
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
    this.callPasswordChangeAPI(this.token, pw);
  }

  callCheckTokenAPI(token) {
    super.api.checkPasswordChangeToken(token, (r)=>{
      if (r.error) super.errorAlert(r.res_code);
      this.activeMode(token);
    });
  }

  callPasswordChangeAPI(token, pw) {
    super.visibleIndicator(true);
    super.api.passwordChange(token, pw,
      (r)=>{
        super.visibleIndicator(false);
        if (r.error) {
          super.errorAlert(r.res_code);
          return;
        }
        super.alert(super.getString("alert_password_change_complete"),()=>this.deactiveMode());
      }
    );
  }

  activeMode(token) {
    this.token = token;
    this.setState({buttonLock:true});
  }

  deactiveMode() {
    this.setState({buttonLock:false});
  }

  onChangeInput(e) {
    const pw = this.pw.value;
    const pw_re = this.pw_re.value;
    if (pw.length < 1 || pw_re.length < 1) {
      this.btn.lock();
    }
    else {
      this.btn.unlock();
    }
  }

  render() {
    return (
      <div className="page" id="password_change_page">
        {super.attachHeader(super.getString('header_title_password_change'), "none", "none")}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <AdbInput ref={e=>this.pw=e} onChange={this.onChangeInput.bind(this)} type="password" label_title={super.getString("ui_password")} email_placeholder={super.getString("placeholder_input_pw")} />
              <AdbInput ref={e=>this.pw_re=e} onChange={this.onChangeInput.bind(this)} type="password" label_title={super.getString("ui_password_re")} email_placeholder={super.getString("placeholder_input_pw_re")} />

              <Row className="justify-content-center">
                <AdbButton ref={e=>this.btn=e}><p>{super.getString("ui_modify")}</p></AdbButton>
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
