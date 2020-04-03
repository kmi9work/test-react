import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import IndexNovelty from './novelties/IndexNovelty'
import Dashboard from '../components/auth/Dashboard'

import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom'

export default class Index extends Component{

  constructor (props){
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      author: ""
    }
    this.state.novelties = props.novelties;

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleSuccessfulAuth(data){
    //TODO cookie login
    this.setState({
      loggedInStatus: "LOGGED_IN",
      author: data.author
    })
    console.log("logged.", this.state.author)
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "LOGGED_OUT",
      author: ""
    })
  }

  render() {
    return(
      <React.Fragment>
      <div className="container">
        <Dashboard 
          {...this.props}
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          handleLogout={this.handleLogout}
          author={this.state.author}
        />
        <hr/>
        <br/>
        <div className="row m-1">
          <h1> News </h1>
          <div className="col-12">
            <IndexNovelty 
              {...this.props}
              loggedInStatus={this.state.loggedInStatus}
              author={this.state.author}
            />
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const novelties = window.novelties
  const categories = window.categories
  const ages = window.ages
  ReactDOM.render(
    <Index novelties={novelties} categories={categories} ages={ages} />,
    document.getElementById('root')
  )
})

