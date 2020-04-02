import React, { Component } from 'react'
import Novelty from './Novelty'
import NewNovelty from './NewNovelty'
import axios from 'axios'


export default class IndexNovelty extends Component{
  state = {
    novelties: []
  }

  constructor(props){
    super(props);
    this.state.novelties = props.novelties.map((n) => {n.is_editing = false; return n});
    this.handleNoveltiesChange = this.handleNoveltiesChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  handleNoveltiesChange(novelty, id = 0, method = "create"){
    novelty.is_editing = false
    let novelties = this.state.novelties;
    if (method == "delete"){
      axios.delete("http://localhost:3000/novelties/"+id, 
                   {withCredentials: true}).then(response => {
        if (response.data.status === 'destroyed'){
          novelties = novelties.filter((n) => {return n.id != id})
          this.setState({ novelties: novelties })
        }
      }).catch(error => {
        console.log("Delete error", error);
      });
    }else if (method == "update"){
      axios
        .patch("http://localhost:3000/novelties/"+id,
          { novelty: novelty }, 
          {withCredentials: true})
        .then(response => {
          if (response.data.status === 'updated'){
            novelties[novelties.findIndex((n) => {return n.id == id})] = JSON.parse(response.data.novelty)
            this.setState({ novelties: novelties })
          }else{
            novelties[novelties.findIndex((n) => {return n.id == id})].is_editing = false
            this.setState({ novelties: novelties })
            console.log("Forbidden")
          }
        })
        .catch(error => {
          console.log("Update error", error);
        });
    }else{
      axios
        .post("http://localhost:3000/novelties/",
          { novelty: novelty }, 
          {withCredentials: true})
        .then(response => {
          if (response.data.status === 'created'){
            novelties.unshift(JSON.parse(response.data.novelty))
            this.setState({ novelties: novelties })
          }
        })
        .catch(error => {
          console.log("Create error", error);
        });
    }
  }

  handleEdit (event){
    let id = event.target.attributes.noveltyid.value
    let novelties = [...this.state.novelties]
    novelties[novelties.findIndex((n) => {return n.id == id})].is_editing = true
    this.setState({novelties: novelties})
  }

  cancelEdit(id){
    let novelties = [...this.state.novelties]
    novelties[novelties.findIndex((n) => {return n.id == id})].is_editing = false
    this.setState({novelties: novelties})
  }

  handleCreate (novelty){
    this.handleNoveltiesChange(novelty)
  }
  
  renderNovelties(){
    return this.state.novelties.map((novelty) => {
      return <Novelty 
                {...this.props}
                novelty={novelty} 
                handleEdit={this.handleEdit} 
                handleNoveltiesChange={this.handleNoveltiesChange}
                cancelEdit={this.cancelEdit}
      />
    })
  }
  render(){
    return (
      <React.Fragment>
        <NewNovelty 
          {...this.props}
          handleFormSubmit={this.handleCreate} 
          categories={this.props.categories} 
          loggedInStatus={this.state.loggedInStatus}
        />
        {this.renderNovelties()}
      </React.Fragment>
    )
  }
}