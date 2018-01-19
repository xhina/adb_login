import React from 'react';
import BrowserHistory from './browser-history';

// Page Component
import MainPage from '../view/main_account_select';
import EmailAccountPage from '../view/create_email_account';
import ServiceAgreement from '../view/service_agreement';
import PrivacyPolicy from '../view/privacy_policy';
import AdditionalInfo from '../view/additional_info';
import Login from '../view/login';
import TemporaryPassword from '../view/temporary_password';
import {GoFowardTransition, GoBackwardTransition} from './page-transition';

export const PageUID = {
  MAIN_ACCOUNT_SELECT: Symbol(),
  CREATE_EMAIL_ACCOUNT: Symbol(),
  SERVICE_AGREEMENT: Symbol(),
  PRIVACY_POLICY: Symbol(),
  ADDITIONAL_INFO: Symbol(),
  LOGIN: Symbol(),
  TEMPORARY_PASSWORD: Symbol(),
};

const history = new BrowserHistory();
const FORCE_ROUTE_BACK_TIME = 600;
let loadedPage = null;
let loadPage = null;
let routeContainer;
let refTarget;
let block = false;

export let SetRouteContainer = (container) => {
  routeContainer = container;
};

export const RoutePage = (pageUID) => {
  history.go(pageUID);
  Route(loadPageComponent(pageUID));
};

const loadPageComponent = (pageUID) => {
  let pageView;
  switch (pageUID) {
    case PageUID.MAIN_ACCOUNT_SELECT:
      pageView = <MainPage key="1" ref={(c)=>refTarget=c} />;
      break;
    case PageUID.CREATE_EMAIL_ACCOUNT:
      pageView = <EmailAccountPage key="2" ref={(c)=>refTarget=c} />;
      break;
    case PageUID.SERVICE_AGREEMENT:
      pageView = <ServiceAgreement key="3" ref={(c)=>refTarget=c} />;
      break;
    case PageUID.PRIVACY_POLICY:
      pageView = <PrivacyPolicy key="4" ref={(c)=>refTarget=c} />;
      break;
    case PageUID.ADDITIONAL_INFO:
      pageView = <AdditionalInfo key="5" ref={(c)=>refTarget=c} />;
      break;
    case PageUID.LOGIN:
      pageView = <Login key="6" ref={(c)=>refTarget=c} />;
      break;
    case PageUID.TEMPORARY_PASSWORD:
      pageView = <TemporaryPassword key="7" ref={(c)=>refTarget=c} />;
      break;
    default:
      pageView = null;
      break;
  }
  loadedPage = loadPage;
  loadPage = pageView;
  return pageView;
};

const routeBlock = ()=>{
  block = true;
  setTimeout(()=>block = false, FORCE_ROUTE_BACK_TIME + 150);
}

const Route = (page) => {
  routeContainer.addRender(page);
  routeContainer.renderTrigger();
};

const RouteBack = () => {
  routeContainer.removeRender();
  routeContainer.renderTrigger();
}

export const Go = (pageUID) => {
  if (block) return;
  if (!history.go(pageUID)) return;

  const pageIn = loadPageComponent(pageUID);
  routeBlock();
  Route(pageIn);
};

export const GoBack = () => {
  if (block) return;
  if (!GoBackEnable()) return;

  history.goBack();

  const pageOut = loadedPage;
  if (refTarget.isPageRenderMode()) {
    routeBlock();
    setTimeout(()=>RouteBack(), FORCE_ROUTE_BACK_TIME);
    refTarget.pageOut();
  }
  else {
    RouteBack();
  }
};

export const GoBackEnable = () => history.goBackEnable();
