import React, {Component} from 'react';
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

  constructor(props) {
    super(props);
  }

  render() {
    return (<Container>
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
          <Button color="primary" size="lg">이메일로 가입하기</Button>
        </Row>
      </Form>
    </Container>);
  }
}

export default View;
