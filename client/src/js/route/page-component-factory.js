import React from 'react';
import MainPage from '../view/main_account_select';
import EmailAccountPage from '../view/create_email_account';
import ServiceAgreement from '../view/service_agreement';
import PrivacyPolicy from '../view/privacy_policy';
import AdditionalInfo from '../view/additional_info';
import Login from '../view/login';
import TemporaryPassword from '../view/temporary_password';
import Dummy from '../view/dummy';

let loadedpageUID = null;
let loadPageUID = null;
const REF_TABLES = {};
const PAGE_COMPS = {};

export const PAGE_UID = {
  MAIN_ACCOUNT_SELECT: Symbol(),
  CREATE_EMAIL_ACCOUNT: Symbol(),
  SERVICE_AGREEMENT: Symbol(),
  PRIVACY_POLICY: Symbol(),
  ADDITIONAL_INFO: Symbol(),
  LOGIN: Symbol(),
  TEMPORARY_PASSWORD: Symbol(),
  DUMMY1: Symbol(),
  DUMMY2: Symbol(),
};

export const createPageComponent = (pageUID, options) => {
  let pageView;
  switch (pageUID) {
    case PAGE_UID.MAIN_ACCOUNT_SELECT:
      pageView = <MainPage key="1" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.CREATE_EMAIL_ACCOUNT:
      pageView = <EmailAccountPage key="2" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.SERVICE_AGREEMENT:
      pageView = <ServiceAgreement key="3" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.PRIVACY_POLICY:
      pageView = <PrivacyPolicy key="4" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.ADDITIONAL_INFO:
      pageView = <AdditionalInfo key="5" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.LOGIN:
      pageView = <Login key="6" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.TEMPORARY_PASSWORD:
      pageView = <TemporaryPassword key="7" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.DUMMY1:
      pageView = <Dummy key="8" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PAGE_UID.DUMMY2:
      pageView = <Dummy key="9" onFinishPageBack={options.onFinishPageBack} ref={(c)=>addRefTable(pageUID, c)} />;
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
