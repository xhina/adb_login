import React, {Component} from 'react'
import MainPage from './page/main_create_account_type'
import EmailAccountPage from './page/create_email_account'

export const PageName = {
  MAIN_LOGIN: Symbol("main_create_account_type"),
  CREATE_EMAIL_ACCOUNT: Symbol("create_email_account")
}

export const PageContainer = (pageName) => {
  switch (pageName) {
    case PageName.MAIN_LOGIN:
      return <MainPage/>;
    case PageName.CREATE_EMAIL_ACCOUNT:
      return <EmailAccountPage/>;
    default:
      break;
  }
}
