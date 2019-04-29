import React,{ Component } from 'react';
import Profiles from './Profiles';
import Search from './Search';


const GITHUB_API = 'https://api.github.com/users'
class Github extends Component{

  constructor(props){
    super(props);

    this.state={
      username:'abhash24oct',
      name:'',
      avatar:'',
      repos:'',
      followers:'',
      following:'',
      location:'',
      url:'',
      message:''

    }
    this.getProfile=this.getProfile.bind(this);
  }

  getProfile(username){
    let finalApi = `${GITHUB_API}/${username}`;

    fetch(finalApi)
    .then((res)=> res.json())
    .then((data)=>{
      this.setState({
        username:data.login,
        name:data.name,
        avatar:data.avatar_url,
        repos:data.public_repos,
        followers:data.followers,
        following:data.following,
        homeURL:data.html_url,
        location:data.location,
        message:data.message
      });
      console.log(this.state);
    })
    .catch( e => console.log(e));
  }

  componentDidMount(){
    this.getProfile(this.state.username);
  }

  render(){
    return(
      <div>
        <section id="card">
          <Search searchProfile={this.getProfile}/>
          <Profiles userData={this.state}/>
        </section>
      </div>
    );
  };
};

export default Github;
