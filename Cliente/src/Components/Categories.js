import React from 'react';
import { Button } from '@material-ui/core';

export default class Categories extends React.Component {
  constructor(props){
    super(props)
    this.state={
      type:"Search",
      selected:'Select',
      name:"",
      description:"",
      categoryNames:[]
    };
    this.getNames=this.getNames.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getFormular = this.getFormular.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.getNames();

  }

  getNames(){
    fetch("/consultarSubCategorias", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ table: "category"})
    })
    .then(res => res.json())
    .then(res => this.setState({categoryNames:res}))
  }

  eliminar(){

    fetch("/consultarSubCategorias", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ table: "category"})
    })
    .then(res => res.json())
    .then(res => this.setState({categoryNames:res}))

  }

  handleSelect(event){
    if(event.target.value!=="Select"){
      let object = this.state.categoryNames.find(x => x.name_category===event.target.value)
      this.setState({
        selected:event.target.value,
        name:object.name_category,
        description:object.description
      },() => {
        console.log(this.state);
      }); 
    }
  }

  getFormular(){

    if(this.state.selected!=="Select"){
    console.log(this.state)

      switch(this.state.type){
        case "Search":
            return (<div>
              <h2>Nombre:</h2>
              <h3>{this.state.name}</h3>

              <h2>Description:</h2>
              <h3>{this.state.description}</h3>

              <Button>Actualizar</Button>
              <Button onclick={this.eliminar}>Eliminar</Button>
          
            </div>);
        default:
          return
      }
    }
  }

  render(){

    return (<div>
      <h1>Categories</h1>
      
      <select
            name="categoryName"
            defaultValue="Select"
            onChange={this.handleSelect}
          >
            <option value="Select" disabled>
              Selecciona una categoria:
            </option>
            {this.state.categoryNames.map(x =>
                      <option value={x.name_category} key={x.name_category}>
                            {x.name_category}
                      </option>)}
      </select>
      {this.getFormular()}
      <Button>Crear Categoria</Button>
    </div>);

    
  }
}