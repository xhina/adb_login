import React from 'react';
import ReactDOM from 'react-dom';
import {Motion,spring} from 'react-motion';
import _ from 'lodash';
import Page from '../page';

let removeIntended;

function screenSize() {
  return window.innerWidth;
}

function onRest() {
  if (removeIntended == null) return;
}

export const GoFowardTransition = (pageIn, pageOut) => {
  removeIntended = pageOut;

  return (
    <div>
      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} onRest={onRest} defaultStyle={{x:screenSize()}} style={{x:spring(0)}}>
        {
          ({x}) =>
              <div style={{
                width:'100%',
                position:'absolute',
                zIndex:'0',
                transform:`translate3d(${x}px, 0, 0)`
              }}>{pageIn}</div>
        }
      </Motion>

      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} defaultStyle={{x:0}} style={{x:spring(-screenSize())}}>
        {
          ({x}) =>
              <div style={{
                width:'100%',
                position:'absolute',
                zIndex:'1',
                transform:`translate3d(${x}px, 0, 0)`
              }}>{pageOut}</div>
        }
      </Motion>
    </div>
  );
};

export const GoBackwardTransition = (pageOut, pageIn) => {
  return (
    <div>
      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} defaultStyle={{x:0}} style={{x:spring(screenSize())}}>
        {
          ({x}) =>
              <div style={{
                width:'100%',
                position:'absolute',
                zIndex:'1',
                transform:`translate3d(${x}px, 0, 0)`
              }}>{pageOut}</div>
        }
      </Motion>

      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} defaultStyle={{x:-screenSize()}} style={{x:spring(0)}}>
        {
          ({x}) =>
              <div style={{
                width:'100%',
                position:'absolute',
                zIndex:'0',
                transform:`translate3d(${x}px, 0, 0)`
              }}>{pageIn}</div>
        }
      </Motion>
    </div>
  );
}
