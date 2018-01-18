import React from 'react';
import {Motion,spring} from 'react-motion';
import _ from 'lodash';

let outContainer;

function screenSize() {
  return window.innerWidth;
}

function hiddenContainer() {
  if (outContainer == null) return;
  outContainer.hidden();
  outContainer = null;
}

const createOutContainer = (page) => {
  return <TransitionContainer ref={c => outContainer = c}>{page}</TransitionContainer>;
}

export const GoFowardTransition = (pageIn, pageOut) => {
  return (
    <div>
      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} onRest={hiddenContainer} defaultStyle={{x:screenSize()}} style={{x:spring(0, {stiffness:200, damping:30, precision:1})}}>
        {
          ({x}) =>
          <div style={{
            width:'100%',
            position:'absolute',
            zIndex:'1',
            transform:`translate3d(${x}px, 0, 0)`,
          }}>{pageIn}</div>
        }
      </Motion>
      { pageOut ? createOutContainer(pageOut) : "" }
    </div>
  );
};

export const GoBackwardTransition = (pageIn, pageOut) => {
  const pageOutContainer = createOutContainer(pageOut);

  return (
    <div>
      <Motion key={_.random(Number.MAX_SAFE_INTEGER)} onRest={hiddenContainer} defaultStyle={{x:0}} style={{x:spring(screenSize(), {stiffness:200, damping:30, precision:1})}}>
        {
          ({x}) =>
          <div style={{
            width:'100%',
            position:'absolute',
            zIndex:'1',
            transform:`translate3d(${x}px, 0, 0)`
          }}>{pageOutContainer}</div>
        }
      </Motion>
      {pageIn}
    </div>
  );
}

class TransitionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden:false,
    }
  }

  hidden() {
    this.setState({hidden:true});
  }

  render() {
    if (this.state.hidden) {
      return null;
    }

    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }


}
