import React from 'react';
import {Nav,NavItem,NavLink} from 'reactstrap';
import Navigator from '../route/page-navigator';
import PropTypes from 'prop-types';

class HeaderView extends Navigator {

  constructor(props) {
    super(props);
    this.state = {
      headerSticky : false
    }
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

  componentDidMount() {
    // setTimeout(this.setHeaderStickyTop.bind(this), 700);
  }

  setHeaderStickyTop() {
    this.setState({headerSticky:true});
  }

  render() {
    let navClass = ["justify-content-center", "nav-fill"];
    if (this.state.headerSticky) {
      navClass.push("sticky-top");
    }

    return (
      <Nav style={{width:'100%',backgroundColor:'#ff8822'}} className={navClass.join(' ')}>
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
