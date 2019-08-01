import React from 'react';
import { Button, Input } from '@material-ui/core';

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
    this.crear = this.crear.bind(this);
    this.showForm =this.showForm.bind(this);
    //this.getNames();

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

    fetch("/eliminarSubCategorias", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: "category", category:this.state.name})
    })
    .then(res => res.json())
    .then(res =>{
      if(res.bool){
        console.log("SI ELIMINO")
      }
      else console.log("NO ELIMINO")
    })

  }

  crear(){

    fetch("/crearSubCategorias", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: "category",
                             name:this.state.name,
                             description:this.state.description})
    })
    .then(res => res.json())
    .then(res =>{
      if(res.bool){
        console.log("SI ELIMINO")
      }
      else console.log("NO ELIMINO")
    })

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

  showForm(){
    this.setState({
      type:"Create",
      name:"",
      description:"",
    })
  }



  getFormular(){

    if(this.state.selected!=="Select"){
    console.log(this.state)

      switch(this.state.type){
        case "Search":
            return (<div key="0">
              <h2 key="1">Nombre:</h2>
              <h3 key="2">{this.state.name}</h3>

              <h2 key="3">Description:</h2>
              <h3 key="4">{this.state.description}</h3>

              <Button key="5">Actualizar</Button>
              <Button key="6" onClick={this.eliminar}>Eliminar</Button>
          
            </div>);
        default:
          return
      }
    }
  }

  render(){

    if(this.state.type!=="Create"){
      return (<div>
        <h1>Categorias</h1>
        
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
        <Button onClick={this.showForm()}>Crear Categoria</Button>
      </div>);
    }
    else{
      return(
        <div>
          <h1>Categorias</h1>
          <form>
            <h3>Nombre de la categoria:</h3>
            <Input placeholder='Nombre de la categoria'/><br/>
            <h3>Descripcion de la categoria:</h3>
            <Input placeholder='Descripcion de la categoria'/><br/>
            <Button onClick={this.crear()}>Crear</Button>
          </form>
        </div>
      )
    }
  }
}