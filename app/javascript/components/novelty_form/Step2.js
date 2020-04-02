import React, { Component } from 'react'
class Step2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null
    }
    return(
      <React.Fragment>
        <div className="form-group" key="text">
          <label htmlFor="text">Text</label>
          <textarea
            className="form-control"
            id="novelty-text"
            name="text"
            type="textarea"
            placeholder="Enter text"
            value={this.props.text}
            onChange={this.props.handleChange}
            rows="8"
            required
          />
        </div>
      </React.Fragment>
    )
  }
}

export default Step2