import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Label,
  Input,
  FormGroup
} from 'reactstrap';

class AdbInput extends React.Component {

  resetValue() {
    if (this.target == null) return;
    this.target.value = "";
  }

  onChange(e) {
    this.target = e.target;
    this.setState({value:e.target.value});
  }

  get value() {
    return this.target != null ? this.target.value : "";
  }

  render() {
    return (
      <FormGroup id="adb_input_formgroup">
        <Row>
          <Col id="col_label">
            <Label for={this.props.type}>{this.props.label_title}</Label>
          </Col>
          <Col id="col_input">
            <Input type={this.props.type} id={this.props.type} onChange={this.onChange.bind(this)} placeholder={this.props.email_placeholder} required />
          </Col>
          <Col id="col_reset" onClick={this.resetValue.bind(this)}>
            <div id="reset_btn" />
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default AdbInput;

AdbInput.propTypes = {
  type: PropTypes.string,
  email_placeholder: PropTypes.string,
  label_title:PropTypes.string
}
