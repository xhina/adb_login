import React from 'react';
import Page from '../route/page';
import StringResource from '../string-resource';
import Header from '../header/header';

export default class BaseView extends Page {
  attachHeader(title, leftBtnType, rightBtnType) {
    return <Header left={leftBtnType} right={rightBtnType} />;
  }

  getStrRes(id) {
    return StringResource.get(id);
  }
}
