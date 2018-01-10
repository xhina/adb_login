import React from 'react';
import Page from '../route/page';
import StringResource from '../string-resource';
import Header from '../header/header';
import AlertModal from './alert-modal';

export default class BaseView extends Page {
  constructor(props) {
    super(props);
  }

  attachHeader(title, leftBtnType, rightBtnType) {
    return <Header left={leftBtnType} right={rightBtnType} />;
  }

  alert(message, onConfirm) {
    if (this.alert == null) return;
    this.alert.show(message, onConfirm);
  }

  attachAlertModal() {
    return React.createElement(AlertModal, {ref:(a) => this.alert = a});
  }

  getStrRes(id) {
    return StringResource.get(id);
  }
}
