import React from 'react';
import {Motion,spring} from 'react-motion';
import _ from 'lodash';

let pageOutClass;

function screenSize() {
  return window.innerWidth;
}

function onRestPageOut() {
  if (!pageOutClass) return;
  pageOutClass.hidden();
  pageOutClass = null;
}

export const GoFowardTransition = (pageIn, pageOut) => {
  if (pageOut) {
    pageOut = React.cloneElement(pageOut, {ref:(cl)=> pageOutClass = cl});
  }

  return (
    <div>
      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} defaultStyle={{x:screenSize()}} style={{x:spring(0)}}>
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

      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} onRest={onRestPageOut} defaultStyle={{x:0}} style={{x:spring(-screenSize())}}>
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

export const GoBackwardTransition = (pageIn, pageOut) => {
  if (pageOut){
    pageOut = React.cloneElement(pageOut, {ref:(cl)=> pageOutClass = cl});
  }

  return (
    <div>
      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} onRest={onRestPageOut} defaultStyle={{x:0}} style={{x:spring(screenSize())}}>
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
