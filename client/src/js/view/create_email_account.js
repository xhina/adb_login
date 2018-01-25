import React from 'react';
import BaseView from './base_view';
import { PAGE_UID } from '../route/page-component-factory';
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

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.pageRender(this.view());
  }

  onClickJoinEmail() {
    super.go(PAGE_UID.DUMMY1);
  }

  view() {
    return (
      <div className="page">
        {super.attachHeader(super.getUiString('email_account_title'))}
        {super.attachAlertModal()}

        <div className="pre-scrollable">
          <Container>
            <Form>
              <FormGroup>
                <Row>
                  <Col xs='2'>
                    <Label for="email">이메일</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="email" name="email" id="inputEmail" placeholder="adb@example.com"/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="pw">비밀번호</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="pw" name="pw" id="inputPassword" placeholder="최소4자 ~ 12자"/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="2">
                    <Label for="userName">이름</Label>
                  </Col>
                  <Col xs='10'>
                    <Input type="name" name="userName" id="inputUsername" placeholder="최소2자 ~ 16자"/>
                  </Col>
                </Row>
              </FormGroup>
              <Row className="justify-content-center">
                <Button color="primary" size="lg" onClick={this.onClickJoinEmail}>이메일로 가입하기</Button>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    );
  }

}

export default View;
