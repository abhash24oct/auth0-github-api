import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Github from "./Components/Github";
import Header from "./Components/Header";
import * as auth0 from 'auth0-js';

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      idToken:'',
      accessToken:'',
      expiresAt:''
    };
     this.setSession= this.setSession.bind(this);
     this.logout=this.logout.bind(this);
  }

  static defaultProps ={
    clientID: 'eBwTACWUixqUfANiUNXOkdrNHtID1uHu',
    domain : 'abhash24oct.auth0.com'
  }

  componentWillMount(){
    this.auth = new auth0.WebAuth({
                      clientID:this.props.clientID,
                      domain : this.props.domain,
                      responseType: 'token id_token',
                      redirectUri: 'http://localhost:3000/'
              });

      this.auth.parseHash((err, authResult) => {
         if (authResult && authResult.accessToken && authResult.idToken) {
           console.log(authResult);
           this.setSession(authResult);
         } else if (err) {

           console.log(err);
           alert(`Error: ${err.error}. Check the console for further details.`);
         }
     });

  }

  loginUser(){
    this.auth.authorize();
  }

  logout(){
    this.setState({
      idToken:'',
      accessToken:'',
      expiresAt:''
    },()=>{
      localStorage.removeItem('idToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiresAt');
    })

    this.auth.logout({
      returnTo: window.location.origin
    });
  }

  setSession(authResult){

    // Set isLoggedIn flag in localStorage
   localStorage.setItem('isLoggedIn', 'true');

   // Set the time that the Access Token will expire at
   let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
   localStorage.setItem('accessToken',authResult.accessToken);
   localStorage.setItem('idToken',authResult.idToken);
   localStorage.setItem('expiresAt',((authResult.expiresIn * 1000) + new Date().getTime()));

   this.setState({
     idToken:localStorage.getItem('idToken'),
     accessToken:localStorage.getItem('accessToken'),
     expiresAt:localStorage.getItem('expiresAt')
   })
  }




  render(){

    let gitty;
    if(new Date().getTime()<this.state.expiresAt){
      gitty =<Github />
    }else{
      gitty="Click on the login page to login";
    }



    return (
      <div className="App">
        <Header
          expiresAt={this.state.expiresAt}
          onLogout={this.logout}
          loginUser ={this.loginUser.bind(this)}/>
        {gitty}
      </div>

    )
  };
}

export default App;
