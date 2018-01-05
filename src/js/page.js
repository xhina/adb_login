import React from 'react';
import Header from './header/header';
import Navigator from './route/page-navigator';
import StringResource from './string-resource';

export default class Page extends Navigator {

  attachHeader(title, leftBtnType, rightBtnType) {
    return <Header title={title} left={leftBtnType} right={rightBtnType} />;
  }

  getStrRes(id) {
    return StringResource.get(id);
  }
}
