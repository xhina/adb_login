import React, {Component} from 'react';
import MainPage from './page/main_account_select';
import EmailAccountPage from './page/create_email_account';
import ServiceAgreement from './page/service_agreement';
import PrivacyPolicy from './page/privacy_policy';
import AdditionalInfo from './page/additional_info';
import Login from './page/login';
import TemporaryPassword from './page/temporary_password';
import Header from './header';

export const PageName = {
  MAIN_ACCOUNT_SELECT: Symbol(),
  CREATE_EMAIL_ACCOUNT: Symbol(),
  SERVICE_AGREEMENT: Symbol(),
  PRIVACY_POLICY: Symbol(),
  ADDITIONAL_INFO: Symbol(),
  LOGIN: Symbol(),
  TEMPORARY_PASSWORD: Symbol(),
  HEADER: Symbol(),
};

export const EntryPage = PageName.MAIN_ACCOUNT_SELECT;

let routeContainer;
export let SetRouteContainer = (container) => {
  routeContainer = container;
};

export const RoutePage = (pageName) => {
  let pageView;
  switch (pageName) {
    case PageName.MAIN_ACCOUNT_SELECT:
      pageView = <MainPage />;
      break;
    case PageName.CREATE_EMAIL_ACCOUNT:
      pageView = <EmailAccountPage />;
      break;
    case PageName.SERVICE_AGREEMENT:
      pageView = <ServiceAgreement />;
      break;
    case PageName.PRIVACY_POLICY:
      pageView = <PrivacyPolicy />;
      break;
    case PageName.ADDITIONAL_INFO:
      pageView = <AdditionalInfo />;
      break;
    case PageName.LOGIN:
      pageView = <Login />;
      break;
    case PageName.TEMPORARY_PASSWORD:
      pageView = <TemporaryPassword />;
      break;
    case PageName.HEADER:
      pageView = <Header />;
      break;
    default:
      pageView = null;
      break;
  }
  Routing(pageView);
};

const Routing = (pageComponent) => {
    routeContainer.setState({'location' : pageComponent});
};
