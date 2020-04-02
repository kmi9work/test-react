import React, { Component } from 'react'
import EditNovelty from './EditNovelty'

export default class Novelty extends Component{
  constructor(props){
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleUpdate (novelty){
    this.props.handleNoveltiesChange(novelty, novelty.id, "update")
  }

  handleDelete (event){
    let id = event.target.attributes.noveltyid.value
    this.props.handleNoveltiesChange({}, id, "delete") //TODO check up
  }

  render(){
    if (this.props.novelty.is_editing){
      return <EditNovelty 
        {...this.props}
        handleFormSubmit={this.handleUpdate}
        categories={this.props.categories}
        novelty={this.props.novelty} 
        cancelEdit={this.props.cancelEdit}
      />
    }
    return(
      <div className="novelty row m-1 bg-light" key={this.props.novelty.id}>
        <div className="col-10">
          Category: {(this.props.novelty.category) ? this.props.novelty.category.title : "No category"}.
          Author: {(this.props.novelty.author) ? this.props.novelty.author.name : "No author"}
        </div>
        <div className="col-2 text-right">
          {this.props.novelty.published_at}
        </div>
        <h3>
          <a href={"/novelties/"+this.props.novelty.id}>
            {this.props.novelty.title}
          </a>
        </h3>
        <div className="col-12">
          <button className="btn btn-primary btn-sm m-1" onClick={this.handleDelete} noveltyid={this.props.novelty.id}> DELETE </button>
          <button className="btn btn-primary btn-sm m-1" onClick={this.props.handleEdit} noveltyid={this.props.novelty.id}> EDIT </button>
        </div>
      </div>
    )// TODO href to js
  }
}