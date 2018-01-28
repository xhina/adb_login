import React from 'react';
import BrowserHistory from './browser-history';
import Page from './page';
import {PAGE_UID, createPageComponent, getReactRef} from './page-component-factory';
import RenderQueue, { addRender, removeRenderPop, getRenderElements, renderTrigger } from '../app-renderer';

const ROUTE_routeBlockING_TIME = 800;
const HISTORY = new BrowserHistory();
let routeBlock = false;

export const RoutePage = (pageUID) => {
  HISTORY.go(pageUID);
  Route(createPageComponent(pageUID, {onFinishPageBack:RouteBack}));
};

const routerouteBlock = ()=> {
  routeBlock = true;
  setTimeout(()=>routeBlock = false, ROUTE_routeBlockING_TIME);
};

const Route = (page)=> {
  addRender(page);
  renderTrigger();
};

const RouteBack = ()=> {
  removeRenderPop();
  renderTrigger();
};

export const Go = (pageUID)=> {
  if (routeBlock) return;
  if (!HISTORY.go(pageUID)) return;

  const page = createPageComponent(pageUID, {onFinishPageBack:RouteBack});
  Route(page);
  routerouteBlock();
};

export const GoBack = ()=> {
  if (routeBlock) return;
  if (!GoBackEnable()) return;

  const goBackRef = getReactRef(HISTORY.current());
  const pageIn = HISTORY.goBack();
  const pageInRef = pageIn ? getReactRef(pageIn) : null;

  if (goBackRef.isPageRenderMode()) {
    routerouteBlock();
    goBackRef.pageBack();
    if (pageInRef) pageInRef.pageIn();
  }
  else {
    RouteBack();
  }
};

export const GoBackEnable = () => HISTORY.goBackEnable();
