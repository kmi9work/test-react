import React, { Component } from 'react'
class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null
    }
    return(
      <React.Fragment>
        <div className="form-group" key="title">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            id="novelty-title"
            name="title"
            type="text"
            placeholder="Enter title"
            value={this.props.title}
            onChange={this.props.handleChange}
            required
          />
        </div>
        <div className="form-group" key="source">
          <label htmlFor="source">Source</label>
          <input
            className="form-control"
            id="novelty-source"
            name="source"
            type="text"
            placeholder="Enter source"
            value={this.props.source}
            onChange={this.props.handleChange}
            required
          />
        </div>
        <div className="form-group" key="source_url">
          <label htmlFor="source_url">Source URL</label>
          <input
            className="form-control"
            id="novelty-source_url"
            name="source_url"
            type="text"
            placeholder="Enter source URL"
            value={this.props.source_url}
            onChange={this.props.handleChange}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default Step1