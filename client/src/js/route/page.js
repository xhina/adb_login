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
      pageIn : true,
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

  pageIn() {
    this.setState({pageIn:true});
  }

  pageOut() {
    this.setState({pageIn:false});
  }

  render() {
    return (
      <Motion
        defaultStyle={{x:this.state.pageIn ? screenSize() : 0}}
        onRest={this.state.pageIn ? null : this.props.onFinishPageOut}
        style={{x:spring(this.state.pageIn ? 0 : screenSize(), {stiffness:230, damping:30, precision:2})}}
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
