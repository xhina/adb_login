import React, {Component} from 'react';
import {Navbar,Nav,NavItem,NavLink} from 'reactstrap';

class Header extends Component {

  changeNavButton(prop) {
    if (prop == "back") {
      return "<";
    }
    else if (prop == "close") {
      return 'X';
    }
    return null;
  }

  render() {
    return (
      <Nav style={{width:'100%',backgroundColor:'#ff8822'}} className="justify-content-center nav-fill">
        <NavItem>
          <NavLink href="#" className="text-left">{this.changeNavButton(this.props.left)}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>{this.props.title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="text-right">{this.changeNavButton(this.props.right)}</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

Header.defaultProps = {
  title : 'Title',
  left : 'back',
  right : 'close'
}

export default Header;
