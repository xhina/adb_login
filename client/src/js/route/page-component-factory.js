import React from 'react';
import MainPage from '../view/page_view/main_account_select';
import JoinEmail from '../view/page_view/join_email';
import ServiceAgreement from '../view/page_view/service_agreement';
import PrivacyPolicy from '../view/page_view/privacy_policy';
import Login from '../view/page_view/login';
import PasswordFind from '../view/page_view/password_find';
import PasswordChange from '../view/page_view/password_change';
import Dummy from '../view/page_view/dummy';

let loadedpageUID = null;
let loadPageUID = null;
const REF_TABLES = {};
const PAGE_COMPS = {};

export const PAGE_UID = {
  MAIN_ACCOUNT_SELECT: Symbol(),
  JOIN_EMAIL: Symbol(),
  SERVICE_AGREEMENT: Symbol(),
  PRIVACY_POLICY: Symbol(),
  LOGIN: Symbol(),
  PASSWORD_FIND: Symbol(),
  PASSWORD_CHANGE: Symbol(),
  DUMMY1: Symbol(),
};

export const createPageComponent = (pageUID, options) => {
  let pageView;
  switch (pageUID) {
    case PAGE_UID.MAIN_ACCOUNT_SELECT:
      pageView = <MainPage key="1" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.JOIN_EMAIL:
      pageView = <JoinEmail key="2" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.SERVICE_AGREEMENT:
      pageView = <ServiceAgreement key="3" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.PRIVACY_POLICY:
      pageView = <PrivacyPolicy key="4" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.LOGIN:
      pageView = <Login key="6" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.PASSWORD_FIND:
      pageView = <PasswordFind key="8" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.PASSWORD_CHANGE:
      pageView = <PasswordChange key="9" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.DUMMY1:
      pageView = <Dummy key="1000" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    default:
      pageView = null;
      break;
  }
  addPageComp(pageUID, pageView);
  loadedpageUID = loadPageUID;
  loadPageUID = pageUID;
  return pageView;
};

const addRefTable = (pageUID, ref)=> {
  REF_TABLES[pageUID] = ref;
}

const addPageComp = (pageUID, comp)=> {
  PAGE_COMPS[pageUID] = comp;
}

export const getReactRef = (pageUID)=> {
  return REF_TABLES[pageUID];
}
