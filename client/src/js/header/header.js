import React from 'react';
import {Nav,NavItem,NavLink} from 'reactstrap';
import Navigator from '../route/page-navigator';
import PropTypes from 'prop-types';

class HeaderView extends Navigator {

  constructor(props) {
    super(props);
    this.firstRender = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  changeNavButtonView(prop, leftOrRight = 'left') {
    if (leftOrRight === 'left') {
      if ((super.isGoBackEnable() || prop === "back")) return "<";
    }
    else {
      if (!super.isGoBackEnable() || prop === "close") return 'X';
    }
    return null;
  }

  clickLeft(prop) {
    if ((super.isGoBackEnable() || prop === "back")) {
      super.goBack();
    }
  }

  clickRight(prop) {
    super.close();
  }

  render() {
    return (
      <Nav style={{width:'100%'}} className={"justify-content-center", "nav-fill"}>
        <NavItem>
          <NavLink href="#" className="text-left" onClick={this.clickLeft}>
            {this.changeNavButtonView(this.props.left, 'left')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>{this.props.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="text-right" onClick={this.clickRight}>
            {this.changeNavButtonView(this.props.right, 'right')}
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

HeaderView.defaultProps = {
  title : '',
  left : '',
  right : ''
};

HeaderView.propTypes = {
  title : PropTypes.string,
  left : PropTypes.string,
  right : PropTypes.string,
};

export default HeaderView;
