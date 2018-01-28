import React from 'react';
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

  render() {
    return (
        <div className="page">
          {super.attachHeader('임시 비밀번호 요청')}
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
                <Row className="justify-content-center">
                  <Button color="primary">임시 비밀번호 받기</Button>
                </Row>
              </Form>
            </Container>
          </div>
        </div>
    );
  }
}

export default View;
