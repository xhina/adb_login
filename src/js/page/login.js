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
              <Input type="email" name="email" id="inputEmail" placeholder="가입한 이메일"/>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="2">
              <Label for="userName">이름</Label>
            </Col>
            <Col xs='10'>
              <Input type="name" name="userName" id="inputUsername" placeholder="비밀번호를 입력하세요"/>
            </Col>
          </Row>
        </FormGroup>
        <Row className="justify-content-center">
          <Button style={btn_style} color="gray">이메일로 로그인</Button>
        </Row>
        <Row className="justify-content-center" style={{'margin-top':'1em'}}>
          <h5 style={{'float':'left'}}>비밀번호</h5>
          <p>를 잃어버리셨나요?</p>
        </Row>
        <p className="text-center">------------------또는------------------</p>
        <div className="btn_group">
          <Row className="justify-content-center">
            <Button style={btn_style} color="primary">페이스북으로 가입</Button>
          </Row>
          <Row className="justify-content-center">
            <Button style={btn_style} color="warning">카카오톡으로 가입</Button>
          </Row>
        </div>
      </Form>
    </Container>);
  }
}

const btn_style = {
  'margin': '.2em 0',
  'width':'15em'
};

const btn_group = {
  'margin-top' : '4em',
  'margin-bottom' : '1em'
}

export default View;
