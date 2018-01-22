import React from 'react';
import Page from '../route/page';
import StringResource from '../string-resource';
import Header from '../header/header';
import AlertModal from './alert-modal';
import {TextRes, ImageRes} from '../res-link';

export default class BaseView extends Page {
  constructor(props) {
    super(props);
  }

  attachHeader(title, leftBtnType, rightBtnType) {
    return <Header title={title} left={leftBtnType} right={rightBtnType} />;
  }

  alert(message, onConfirm) {
    if (this.alertModal == null) return;
    this.alertModal.show(message, onConfirm);
  }

  attachAlertModal() {
    return React.createElement(AlertModal, {ref:(a) => this.alertModal = a});
  }

  getUiString(id) {
    return StringResource.get(id);
  }

  get img() {
    return ImageRes;
  }

}
