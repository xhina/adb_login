import React, {Component} from 'react';
import {Navbar,Nav,NavItem,NavLink} from 'reactstrap';

class Header extends Component {

  changeNavButton(prop) {
    if (prop == "back") {
      return <p>&lt;</p>
    }
    else if (prop == "close") {
      return <p>X</p>
    }
    return null;
  }

  render() {
    return (
      <div>
        <Navbar>
          <Nav className="justify-content-center nav-fill">
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
        </Navbar>
      </div>
    );
  }
}

Header.defaultProps = {
  title : 'Title',
  left : 'back',
  right : 'close'
}

export default Header;
