import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class Step3 extends React.Component {
  state = {
    curCategory: null,
    curAge: null
  }
  
  constructor(props) {
    super(props)
    this.state.curCategory = props.categories.find((c) => c.id === props.categoryId)
    if (props.ageId){
      this.state.curAge = props.ages.find((a) => a.id === props.ageId)
    }
    this.changeCategoryHandle = this.changeCategoryHandle.bind(this)
    this.changeAgeHandle = this.changeAgeHandle.bind(this)
  }

  changeCategoryHandle (event, value){
    this.setState((state) => {
      if (value){
        state.curCategory = this.props.categories.find((c) => c.title === value)
      }else{
        state.curCategory = props.categories[0]
      }
      return state
    })
  }

  changeAgeHandle (event, value){
    this.setState((state) => {
      if (value){
        state.curAge = this.props.ages.find((a) => a.title === value)
      }else{
        state.curAge = null
      }
      return state
    })
  }

  render() {
    if (this.props.currentStep !== 3) {
      return null
    }

    return(
      <React.Fragment>
        <div className="form-group" key="category-id">
          <Autocomplete
            id="combo-box-demo"
            value={this.state.curCategory}
            options={this.props.categories}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            onChange={this.props.handleCategorySelect}
            onInputChange={this.changeCategoryHandle}
            disableClearable={true}
          />
        </div>
        <div className="form-group" key="age-id">
          <Autocomplete
            id="combo-box-demo"
            value={this.state.curAge}
            options={this.props.ages}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            onChange={this.props.handleAgeSelect}
            onInputChange={this.changeAgeHandle}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default Step3