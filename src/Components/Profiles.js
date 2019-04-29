import React,{ Component } from 'react';

class Profiles extends Component{

  constructor(props){
    super(props);
    }

  render(){


      let _userData = this.props.userData;
      let followers =`${_userData.homeURL}/followers`;
      let following =`${_userData.homeURL}/following`;
      let repos =`${_userData.homeURL}/repos`;

      if(_userData.message==='Not Found'){
      return(
          <div className="notfound">
            <h2> Heyyyyy!!!</h2>
            <p> Are u sure for what u lokking for  ? </p>
           </div>
        )
      }
      else{
        return(
          <div>
            <section className="github-profile">
               <div className="github-profile-info">
                 <a href={_userData.homeUrl} target="_blank" title={_userData.name || _userData.username}><img src={_userData.avatar} /></a>
                 <h2><a href={_userData.homeUrl} title={_userData.username} target="_blank">{_userData.name || _userData.username}</a></h2>
                 <h3><i className="fas fa-map-marker-alt"></i> &nbsp;{_userData.location}</h3>
               </div>
               <div className="github-profile-state">
                 <ul>
                    <li>
                       <a href={followers} target="_blank" title="Number Of Followers"><i>{_userData.followers}</i><span>Followers</span></a>
                    </li>
                    <li>
                       <a href={repos} target="_blank" title="Number Of Repositoriy"><i>{_userData.repos}</i><span>Repositoriy</span></a>
                    </li>
                    <li>
                       <a href={following} target="_blank" title="Number Of Following"><i>{_userData.following}</i><span>Following</span></a>
                    </li>
                 </ul>
               </div>
            </section>
          </div>
        )
      }

  };
};

export default Profiles;
