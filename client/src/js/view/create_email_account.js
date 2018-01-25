import React from 'react';
import { connect } from 'react-redux';
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
import { PAGE_UID } from '../route/page-component-factory';
import { ACCOUNT_TYPE, join } from '../redux/actions';


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
      return;
    }
    if (name.length < 2 || name.length > 16) {
      return;
    }
    this.dispatch(join(ACCOUNT_TYPE.ADB, email, pw, name));
  }

  view() {
    this.dispatch = this.props.dispatch;

    return (
      <div className="page">
        {super.attachHeader(super.getUiString('email_account_title'))}
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
                    <Input type="email" name="email" id="inputEmail" placeholder="adb@example.com" required />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="pw">비밀번호</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="password" name="pw" id="inputPassword" placeholder="최소4자 ~ 12자" required />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="userName">이름</Label>
                  </Col>
                  <Col xs='10'>
                    <Input name="userName" id="inputUsername" placeholder="최소2자 ~ 16자" required />
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

export default connect()(View);
