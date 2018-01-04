import React, {Component} from 'react';
import {Navbar,Nav,NavItem,NavLink} from 'reactstrap';
import Navigator from '../route/page-navigator';

class HeaderView extends Navigator {

  constructor(props) {
    super(props);
  }

  changeNavButtonView(prop, leftOrRight = 'left') {
    if (leftOrRight == 'left') {
      if ((super.isGoBackEnable() || prop == "back")) return "<";
    }
    else {
      if (!super.isGoBackEnable() || prop == "close") return 'X';
    }
    return null;
  }

  clickLeft(prop) {
    if ((super.isGoBackEnable() || prop == "back")) {
      super.goBack();
    }
  }

  clickRight(prop) {
    super.close();
  }

  render() {
    return (
      <Nav style={{width:'100%',backgroundColor:'#ff8822'}} className="justify-content-center nav-fill">
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
  title : 'Title',
  left : '',
  right : ''
}

export default HeaderView;
