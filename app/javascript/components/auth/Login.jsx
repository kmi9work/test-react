import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component{
  state = {
      email: "",
      password: "",
  }

  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    const {
      email,
      password
    } = this.state;
    event.preventDefault();
    
    axios.post("http://localhost:3000/sessions", {
      author: {
        email: email,
        password: password
      }
    }, {withCredentials: true}).then(response => {
      if (response.data.status === 'created' && response.data.logged_in === true){
        this.props.handleSuccessfulAuth(response.data);
        this.setState({
          email: "",
          password: ""
        })
      }
    }).catch(error => {
      console.log("Login error", error);
    })
  }

  render(){
    if (this.props.loggingStatus){
      return (
        <form className="form-inline col-12" onSubmit={this.handleSubmit}>
        <div className="form-group col-3">
          <input 
            type="email" 
            name="email" 
            className="form-control"
            placeholder="Email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            required
          />
        </div>
        <div className="form-group col-3">
          <input 
            type="password" 
            name="password" 
            className="form-control"
            placeholder="Password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            required 
          />
        </div>
        <div className="form-group col-3">
          <button className="btn btn-primary m-1" type="button" onClick={this.props.toggleFormLogin}>Cancel</button>
          <button className="btn btn-primary m-1" type="submit"> Login </button>
        </div>
        </form>
      )        
    }else{
      return null;
    }
  }
}
