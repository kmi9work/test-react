import React, { Component } from 'react'
import Step1 from '../../components/novelty_form/Step1'
import Step2 from '../../components/novelty_form/Step2'
import Step3 from '../../components/novelty_form/Step3'

import {
  FormFor,
  Submit,
  serializeForm
} from "react-rails-form-helpers"

export default class EditNovelty extends Component{
  state = {
    currentStep: 1,
    novelty: {}
  }

  constructor (props){
    super(props)
    this.state.novelty = {...props.novelty}
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
    this.handleAgeSelect = this.handleAgeSelect.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }
  
  _next() {
    let currentStep = this.state.currentStep

    if (document.getElementById('novelty-form').reportValidity()){
      currentStep = currentStep >= 2? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
  }
    
  _prev(){
    let currentStep = this.state.currentStep
    if (document.getElementById('novelty-form').reportValidity()){
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }

  nextButton(){
    let currentStep = this.state.currentStep;
    if (currentStep < 3){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let novelty = {...this.state.novelty}
    this.props.handleFormSubmit(novelty)
  }

  cancelEdit () {
    this.props.cancelEdit(this.state.novelty.id)
  }

  handleCategorySelect(event, value){
    this.setState((state) => {
      if (value){
        state.novelty.category_id = value.id
      }else{
        state.novelty.category_id = null
      }
      return state
    })
  }

  handleAgeSelect(event, value){
    this.setState((state) => {
      if (value){
        state.novelty.age_id = value.id
      }else{
        state.novelty.age_id = null
      }
      return state
    })
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState((state) => {
      state.novelty[name] = value
      return state
    })
  }

  render(){
    return (
      <form id="novelty-form" onSubmit={this.handleSubmit}>
        <div className="row m-2" style={{ height: 300 }}>
          <div className="col-12">
            <Step1 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              title={this.state.novelty.title}
              source={this.state.novelty.source}
              source_url={this.state.novelty.source_url}
            />
            <Step2 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              text={this.state.novelty.text}
            />
            <Step3 
              currentStep={this.state.currentStep} 
              handleAgeSelect={this.handleAgeSelect}
              handleCategorySelect={this.handleCategorySelect}
              categoryId={this.state.novelty.category_id}
              categories={this.props.categories}
              ageId={this.state.novelty.age_id}
              ages={this.props.ages}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            {this.previousButton()}
            {this.nextButton()}
          </div>
          <div className="col-3">
            <button className="btn btn-primary m-1" type="submit" name="commit">Update</button>
            <button className="btn btn-primary m-1" type="button" onClick={this.cancelEdit}> Cancel edit </button>
          </div>
        </div>
      </form>
    )
  }
}