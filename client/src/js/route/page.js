import React from 'react';
import PropTypes from 'prop-types';
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
      transitionType : "go",
      renderToggle:false
    };
  }

  isPageRenderMode() {
    return this.renderEl ? true : false;
  }

  pageRender(el) {
    this.renderEl = el;
  }

  renderTick(view) {
    if (view != null) this.pageRender(view);
    this.setState({renderToggle:!this.state.renderToggle});
  }

  pageGo() {
    this.setState({transitionType:"go"});
  }

  pageBack() {
    this.setState({transitionType:"back"});
  }

  pageIn() {
    this.setState({transitionType:"in"});
  }

  pageOut() {
    this.setState({transitionType:"out"});
  }

  render() {
    let transitionType = this.state.transitionType;
    let defaultX, destX;
    if (transitionType === "go") {
      defaultX = screenSize();
      destX = 0;
    }
    else if (transitionType === "back") {
      defaultX = 0;
      destX = screenSize();
    }
    else {
      defaultX = 0;
      destX = 0;
    }

    return (
      <Motion
        defaultStyle={{x:defaultX}}
        onRest={transitionType === "back" ? this.props.onFinishPageBack : null}
        style={{x:spring(destX, {stiffness:250, damping:30, precision:5})}}
      >
        {({x}) =>
          <div
            style={{
              position:'relative',
              zIndex:'1',
              left:`${x}px`,
            }}>
            {this.renderEl}
          </div>
        }
      </Motion>
    );
  }
}

Page.propTypes = {
    onFinishPageBack:PropTypes.func
}
