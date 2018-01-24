import React from 'react';
import BrowserHistory from './browser-history';
import Page from './page'

// Page Component
import MainPage from '../view/main_account_select';
import EmailAccountPage from '../view/create_email_account';
import ServiceAgreement from '../view/service_agreement';
import PrivacyPolicy from '../view/privacy_policy';
import AdditionalInfo from '../view/additional_info';
import Login from '../view/login';
import TemporaryPassword from '../view/temporary_password';
import Dummy from '../view/dummy';

export const PageUID = {
  MAIN_ACCOUNT_SELECT: 0,
  CREATE_EMAIL_ACCOUNT: 1,
  SERVICE_AGREEMENT: Symbol(),
  PRIVACY_POLICY: Symbol(),
  ADDITIONAL_INFO: Symbol(),
  LOGIN: Symbol(),
  TEMPORARY_PASSWORD: Symbol(),
  DUMMY1: 2,
  DUMMY2: Symbol(),
};


const ROUTE_BLOCKING_TIME = 800;
const HISTORY = new BrowserHistory();
const REF_TABLES = {};
const PAGE_COMPS = {};

let loadedPageUID = null;
let loadPageUID = null;
let routeContainer;
let refTarget;
let block = false;

export let SetRouteContainer = (container) => {
  routeContainer = container;
};

export const RoutePage = (pageUID) => {
  HISTORY.go(pageUID);
  Route(loadPageComponent(pageUID));
};

const loadPageComponent = (pageUID) => {
  let pageView;
  switch (pageUID) {
    case PageUID.MAIN_ACCOUNT_SELECT:
      pageView = <MainPage key="1" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.CREATE_EMAIL_ACCOUNT:
      pageView = <EmailAccountPage key="2" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.SERVICE_AGREEMENT:
      pageView = <ServiceAgreement key="3" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.PRIVACY_POLICY:
      pageView = <PrivacyPolicy key="4" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.ADDITIONAL_INFO:
      pageView = <AdditionalInfo key="5" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.LOGIN:
      pageView = <Login key="6" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.TEMPORARY_PASSWORD:
      pageView = <TemporaryPassword key="7" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.DUMMY1:
      pageView = <Dummy key="8" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    case PageUID.DUMMY2:
      pageView = <Dummy key="9" onFinishPageBack={RouteBack} ref={(c)=>addRefTable(pageUID, c)} />;
      break;
    default:
      pageView = null;
      break;
  }
  addPageComp(pageUID, pageView);
  loadedPageUID = loadPageUID;
  loadPageUID = pageUID;
  return pageView;
};

const addRefTable = (pageUID, ref)=> {
  REF_TABLES[pageUID] = ref;
}

const addPageComp = (pageUID, comp)=> {
  PAGE_COMPS[pageUID] = comp;
}

const getRef = (pageUID)=> {
  return REF_TABLES[pageUID];
}

const routeBlock = ()=> {
  block = true;
  setTimeout(()=>block = false, ROUTE_BLOCKING_TIME);
}

const Route = (page)=> {
  routeContainer.addRender(page);
  routeContainer.renderTrigger();
};

const RouteBack = ()=> {
  routeContainer.removeRenderPop();
  routeContainer.renderTrigger();
}

export const Go = (pageUID)=> {
  if (block) return;
  if (!HISTORY.go(pageUID)) return;

  const page = loadPageComponent(pageUID);
  routeBlock();
  Route(page);
};

export const GoBack = ()=> {
  if (block) return;
  if (!GoBackEnable()) return;

  const goBackRef = getRef(HISTORY.current());
  const pageIn = HISTORY.goBack();
  const pageInRef = pageIn ? getRef(pageIn) : null;

  if (goBackRef.isPageRenderMode()) {
    routeBlock();
    goBackRef.pageBack();
    if (pageInRef) pageInRef.pageIn();
  }
  else {
    RouteBack();
  }
};

export const GoBackEnable = () => HISTORY.goBackEnable();
