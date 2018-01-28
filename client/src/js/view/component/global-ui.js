import React from 'react';
import LoadingIndicator from './loading_indicator';
import {addStaticRender} from '../../app-renderer';

let loadingIndicatorRef;

export function init() {
  addStaticRender(<LoadingIndicator key="100" ref={c=>loadingIndicatorRef = c} />);
}

export function getLoadingIndicator() {
  return loadingIndicatorRef;
}
