import React from 'react';
import Page from '../../route/page';
import StringResource from '../../string-resource';
import Header from '../header/header';
import AlertModal from '../component/alert-modal';
import {TextRes, ImageRes} from '../../res-link';
import * as api from '../../api-request-handler';
import { PAGE_UID } from '../../route/page-component-factory';
import { getLoadingIndicator } from '../component/global-ui';
import * as fuse from '../../fuse-bridge';

export default class BaseView extends Page {
  constructor(props) {
    super(props);
  }

  get pageUID () {
    return PAGE_UID;
  }

  get api() {
      return api;
  }

  attachHeader(title, leftBtnType, rightBtnType) {
    return <Header title={title} left={leftBtnType} right={rightBtnType} />;
  }

  alert(message, onConfirm) {
    if (this.alertModal == null) return;
    this.alertModal.show(message, onConfirm);
  }

  errorAlert(errorCode) {
    const value = StringResource.hasString(`error${errorCode}`);
    const str = value ? value : this.getString("error_account_api");
    this.alert(str);
  }

  visibleIndicator(visible) {
    getLoadingIndicator().visible(visible);
  }

  attachAlertModal() {
    return React.createElement(AlertModal, {ref:(a) => this.alertModal = a});
  }

  getString(id) {
    return StringResource.get(id);
  }

  sendAccountInfoToFuse(token, email, name) {
    fuse.sendUserAccountInfoToFuse(token, email, name);
  }

  sendCloseMsgToFuse() {
    fuse.closeWebModal();
  }

  get img() {
    return ImageRes;
  }

}
