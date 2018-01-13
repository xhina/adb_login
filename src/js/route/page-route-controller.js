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
let loadedPage = null;
let loadPage = null;
let routeContainer;

export let SetRouteContainer = (container) => {
  routeContainer = container;
};

const loadPageComponent = (pageUID) => {
  let pageView;
  switch (pageUID) {
    case PageUID.MAIN_ACCOUNT_SELECT:
      pageView = <MainPage />;
      break;
    case PageUID.CREATE_EMAIL_ACCOUNT:
      pageView = <EmailAccountPage />;
      break;
    case PageUID.SERVICE_AGREEMENT:
      pageView = <ServiceAgreement />;
      break;
    case PageUID.PRIVACY_POLICY:
      pageView = <PrivacyPolicy />;
      break;
    case PageUID.ADDITIONAL_INFO:
      pageView = <AdditionalInfo />;
      break;
    case PageUID.LOGIN:
      pageView = <Login />;
      break;
    case PageUID.TEMPORARY_PASSWORD:
      pageView = <TemporaryPassword />;
      break;
    default:
      pageView = null;
      break;
  }
  loadedPage = loadPage;
  loadPage = pageView;
  return pageView;
};

const Routing = (pageOutput) => {
  routeContainer.setState({'location' : pageOutput});
};

export const Go = (pageUID) => {
  if (!history.go(pageUID)) return;
  const inPage = loadPageComponent(pageUID);
  Routing(GoFowardTransition(inPage, loadedPage));
};

export const GoBack = () => {
  if (!GoBackEnable()) return;
  const inPage = loadPageComponent(history.goBack());
  Routing(GoBackwardTransition(inPage, loadedPage));
};

export const GoBackEnable = () => history.goBackEnable();
