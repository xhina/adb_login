import React from 'react';
import {Nav,NavItem,NavLink} from 'reactstrap';
import Navigator from '../../route/page-navigator';
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
    if (prop === "none")
      return null;

    if (leftOrRight === 'left') {
      if ((super.isGoBackEnable() || prop === "back")) return <div id="back_button" />;
    }
    else {
      if (!super.isGoBackEnable() || prop === "close") return <div id="close_btn" />;;
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
      <Nav id="header" className={"justify-content-center", "nav-fill"}>
        <NavItem style={{width:'10%'}}>
          <NavLink href="#" className="text-left" onClick={this.clickLeft}>
            {this.changeNavButtonView(this.props.left, 'left')}
          </NavLink>
        </NavItem>
        <NavItem style={{width:'70%'}}>
          <NavLink><p>{this.props.title}</p></NavLink>
        </NavItem>
        <NavItem style={{width:'10%'}}>
          <NavLink href="#" onClick={this.clickRight} style={{width:'100%', textAlign:'right'}}>
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
