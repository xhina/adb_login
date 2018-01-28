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

  constructor(props) {
    super(props);
    super.pageRender(this.view());
  }

  componentDidMount() {

  }

  go() {
    
  }

  view() {
    return (
      <div className="page">
        {super.attachHeader(super.getString('TEST_PAGE_A_TITLE'))}
        {super.attachAlertModal()}
        <h1>TEST PAGE</h1>
        <Button onClick={this.go}>go testpage</Button>
      </div>
    );
  }

}

export default View;
