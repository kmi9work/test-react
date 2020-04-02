import React, { Component } from 'react'
import Registration from './Registration'
import Login from './Login'
import axios from 'axios'

export default class Dashboard extends Component{
  state = {
      loggingStatus: false,
      registerStatus: false,
      email: "",
      password: "",
      name: ""
  }

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleFormLogin = this.toggleFormLogin.bind(this)
    this.toggleFormRegister = this.toggleFormRegister.bind(this)
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
        if         (response.data.logged_in && (this.props.loggedInStatus === "NOT_LOGGED_IN")){
          this.props.handleSuccessfulAuth(response.data);
        } else if (!response.data.logged_in && (this.props.loggedInStatus === "LOGGED_IN")) {
          this.props.handleLogout();
        }
      })
      .catch(error => {
        console.log("Check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout(){
    this.setState({
      email: "",
      password: "",
      name: "",
      loggingStatus: false,
      registerStatus: false
    })
    this.props.handleLogout();
  }

  toggleFormLogin(){
    this.setState({
      loggingStatus: !this.state.loggingStatus,
      registerStatus: false
    })
  }

  toggleFormRegister(){
    this.setState({
      loggingStatus: false,
      registerStatus: !this.state.registerStatus
    })
  }

  handleSuccessfulAuth(data){
    this.setState({
      email: "",
      password: "",
      name: "",
      loggingStatus: false,
      registerStatus: false
    })
    this.props.handleSuccessfulAuth(data)
  }

  render(){
    if (this.props.loggedInStatus === "LOGGED_IN"){
      return(
        <div className="row m-1">
          <div className="col-3 my-auto">
            Name: {this.props.author.name}
          </div>
          <div className="col-3">
            <button className="btn btn-primary m-1" onClick={this.handleLogout}>Logout</button>
          </div>
        </div>
      )
    }else{
      return(
        <React.Fragment>
        <div className="row m-1">
          <div className="col-3">
            <button className="btn btn-primary m-1" onClick={this.toggleFormLogin}>Login</button> 
            <button className="btn btn-primary m-1" onClick={this.toggleFormRegister}>Register</button> 
          </div>
        </div>
        <div className="row m-1">
          <Login 
            toggleFormLogin={this.toggleFormLogin} 
            loggingStatus={this.state.loggingStatus} 
            handleSuccessfulAuth={this.handleSuccessfulAuth}
          />
          <Registration 
            toggleFormRegister={this.toggleFormRegister} 
            registerStatus={this.state.registerStatus} 
            handleSuccessfulAuth={this.handleSuccessfulAuth}
          />
        </div>
        </React.Fragment>
      )
    }
  }
}
