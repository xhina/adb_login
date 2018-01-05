import React from 'react';
import BrowserHistory from './browser-history';

// Page Component
import MainPage from '../page/main_account_select';
import EmailAccountPage from '../page/create_email_account';
import ServiceAgreement from '../page/service_agreement';
import PrivacyPolicy from '../page/privacy_policy';
import AdditionalInfo from '../page/additional_info';
import Login from '../page/login';
import TemporaryPassword from '../page/temporary_password';

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

let routeContainer;
export let SetRouteContainer = (container) => {
  routeContainer = container;
};

const RoutePage = (pageUID) => {
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
  Routing(pageView);
};

export const Go = (pageUID) => {
  history.go(pageUID) ? RoutePage(pageUID) : '';
};

export const GoBack = () => {
  const pageUID = history.goBack();
  pageUID != null ? RoutePage(pageUID) : '';
};

export const GoBackEnable = () => history.goBackEnable();

const Routing = (pageComponent) => {
    routeContainer.setState({'location' : pageComponent});
    console.log('routing');
};
