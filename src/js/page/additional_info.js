import React, {Component} from 'react';
import PageView from '../page-view';
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

class View extends PageView {

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
              <Label for="userName">이름</Label>
            </Col>
            <Col xs='10'>
              <Input type="name" name="userName" id="inputUsername" placeholder="최소2자 ~ 16자"/>
            </Col>
          </Row>
        </FormGroup>
        <Row className="justify-content-center">
          <Button color="primary" size="lg">가입 완료하기</Button>
        </Row>
      </Form>
    </Container>);
  }
}

export default View;
