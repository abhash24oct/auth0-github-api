import React, {Component} from 'react';
import {Navbar, Nav,NavItem} from 'react-bootstrap';

class Header extends Component{

  showLogin(){
    this.props.loginUser();
  }

  onLogout(){
    this.props.onLogout();
  }



  render(){
    let header="";
    if(new Date().getTime() <this.props.expiresAt ){

      header = <NavItem
      onClick={this.onLogout.bind(this)}>
        Logout
      </NavItem>
    }else {
      header= <NavItem href='#'
      onClick={this.showLogin.bind(this)}>
        Login
      </NavItem>
    }

    return(

      <Navbar>
          <Navbar.Brand>
            Github Searcher
          </Navbar.Brand>

        <Nav>
          {header}
        </Nav>
      </Navbar>

    );
  };
};

export default Header;
