import React, { Component } from 'react'
import axios from 'axios'
export default class Registration extends Component{
  state = {
    name: "",
    email: "",
    password: ""
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
      name,
      email,
      password
    } = this.state;

    event.preventDefault();
    axios.post("http://localhost:3000/registrations", {
      author: {
        name: name,
        email: email,
        password: password
      }
    }, {withCredentials: true}).then(response => {
      if (response.data.status === 'created'){
        this.props.handleSuccessfulAuth(response.data); // TODO UP FUNCTION
      }
    }).catch(error => {
      console.log("Registration error", error);
    })
  }

  render(){
    if (this.props.registerStatus){
      return (
        <form className="form-inline col-12" onSubmit={this.handleSubmit}>
          <div className="form-group col-3">
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={this.state.name} 
              onChange={this.handleChange} 
              required 
            />
          </div>
          <div className="form-group col-3">
            <input 
              type="email" 
              name="email" 
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
              placeholder="Password" 
              value={this.state.password} 
              onChange={this.handleChange} 
              required 
            />
          </div>
          <div className="form-group col-3">
            <button className="btn btn-primary m-1" type="submit"> Sign up </button>
            <button className="btn btn-primary m-1" type="button" onClick={this.props.toggleFormRegister}>Cancel</button>
          </div>
        </form>
      )        
    }else{
      return null;
    }
  }
}
