import React,{ Component } from 'react';

class Search extends Component{

  submitForm(e){
    e.preventDefault();
    let value= this.refs.username.value;
    this.props.searchProfile(value);
    this.refs.username.value='';
  }

  render(){
    return(
      <div>
        <form onSubmit={this.submitForm.bind(this)} >
            <label><input type="text" name="username" ref="username" placeholder="Enter username and hit enter" /></label>
        </form>
       </div>
    );
  };
};

export default Search;
