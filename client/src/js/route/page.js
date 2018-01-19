import React from 'react';
import Navigator from './page-navigator';
import {Motion,spring} from 'react-motion';
import _ from 'lodash';

function screenSize() {
  return window.innerWidth;
}

export default class Page extends Navigator {

  constructor(props) {
    super(props);
    this.state = {
      pageIn : true
    };
    this.pageOut = this.pageOut.bind(this);
    this.onFinishMotion = this.onFinishMotion.bind(this);
  }

  isPageRenderMode() {
    return this.renderEl ? true : false;
  }

  pageRender(el) {
    this.renderEl = el;
  }

  pageIn() {
    this.setState({pageIn:true});
  }

  pageOut(onFinishCallback) {
    this.setState({pageIn:false});
    this.onFinishCallback = onFinishCallback;
  }

  onFinishMotion() {
    if (this.onFinishCallback != null) this.onFinishCallback();
  }

  render() {
    return (
      <Motion defaultStyle={{x:this.state.pageIn ? screenSize() : 0}} onRest={this.onFinishMotion} style={{x:spring(this.state.pageIn ? 0 : screenSize())}}>
        {({x}) =>
          <div
            style={{
              zIndex:'1',
              transform:`translate3d(${x}px, 0, 0)`
            }}>
            {this.renderEl}
          </div>
        }
      </Motion>
    );
  }
}
