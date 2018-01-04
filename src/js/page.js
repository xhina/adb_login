import React, {Component} from 'react';
import Header from './header/header';
import Navigator from './route/page-navigator';

export default class Page extends Navigator {

  attachHeader(title, leftBtnType, rightBtnType) {
    return <Header title={title} left={leftBtnType} right={rightBtnType} />;
  }
}
