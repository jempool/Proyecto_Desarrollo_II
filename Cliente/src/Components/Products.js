import React from 'react';
import {Button, Input} from '@material-ui/core'

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      isbn : 45747,
      name_subcategory: "",
      publication_year: "",
      synopsis: "",
      title: "",
      author: "",
      number_of_pages: 342,
      price: 345421, 
      editorial: "",
      edition: "",
      lang: "",
      cover_type: "",
      recommended_age: 15,
      tipo: "inicio" 
    }


    this.insertpro = this.insertpro.bind(this);
    this.insertpro = this.getpro.bind(this);
    this.insertpro = this.updatepro.bind(this);
    this.insertpro = this.deletepro.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.action = this.action.bind(this);
    this.actualizarDatos = this.actualizarDatos.bind(this);

  }

  insertpro(){

      fetch("/insertProduct",{
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isbn : this.state.isbn,
          name_subcategory: this.state.name_subcategory,
          publication_year: this.state.publication_year,
          synopsis: this.state.synopsis,
          title: this.state.title,
          author: this.state.author,
          number_of_pages: this.state.number_of_pages,
          price: this.state.price, 
          editorial: this.state.editorial,
          edition: this.state.edition,
          lang: this.state.lang,
          cover_type: this.state.cover_type,
          recommended_age: this.state.recommended_age 
        })
      })
      .then(res => res.json())
      .then(res => {
        if(res[0].bool){
          console.log("Creo que funciona");
        }
        else{
          console.log("Creo que no funciona");
        }
      }
      )
    
  }

  getpro(){

  }

  updatepro(){

  }

  deletepro(){

  }

  handleClick(e){
        this.setState({tipo: e.target.name});
  }

  actualizarDatos(e){

    switch (e.target.name){
      case 'isbn':
        this.setState({
          isbn:e.target.value
        });
        break;
      case 'name_subcategory':
        this.setState({
          name_subcategory:e.target.value
        })
      break;
      case 'publication_year':
        this.setState({
          publication_year:e.target.value
        })
      break;
      case 'synopsis':
        this.setState({
          synopsis:e.target.value
        })
      break;
      case 'title':
        this.setState({
          title:e.target.value
        })
      break;
      case 'author':
        this.setState({
          author:e.target.value
        })
      break;
      case 'number_of_pages':
        this.setState({
          number_of_pages:e.target.value
        })
      break;
      case 'price':
        this.setState({
          price:e.target.value
        })
      break;
      case 'editorial':
        this.setState({
          editorial:e.target.value
        })
      break;
      case 'edition':
        this.setState({
          edition:e.target.value
        })
      break;
      case 'lang':
        this.setState({
          lang:e.target.value
        })
      break;
      case 'cover_type':
        this.setState({
          cover_type:e.target.value
        })
      break;
      case 'recommended_age':
        this.setState({
          recommended_age:e.target.value
        })
      break;
      default:
      break;
    }
  }

  action(){
    switch (this.state.tipo) {
      case "insertar":
        return(
          <div>
            <form>
              <Input name="isbn" type="text" placeholder='ISBN*' onChange={this.actualizarDatos} value={this.state.isbn}/>
              <Input name="name_subcategory" type="text" placeholder='Subcategoria*' onChange={this.actualizarDatos} value={this.state.name_subcategory}/>
              <Input name="publication_year" type="text" placeholder='Año*' onChange={this.actualizarDatos} value={this.state.publication_year}/>
              <Input name="synopsis" type="text" placeholder='Sipnosis*' onChange={this.actualizarDatos} value={this.state.synopsis}/>
              <Input name="title" type="text" placeholder='Titulo*' onChange={this.actualizarDatos} value={this.state.title}/>
              <Input name="author" type="text" placeholder='Autor*' onChange={this.actualizarDatos} value={this.state.author}/>
              <Input name="number_of_pages" type="text" placeholder='Páginas*' onChange={this.actualizarDatos} value={this.state.number_of_pages}/>
              <Input name="price" type="text" placeholder='Precio*' onChange={this.actualizarDatos} value={this.state.price}/>
              <Input name="editorial" type="text" placeholder='Editorial*' onChange={this.actualizarDatos} value={this.state.editorial}/>
              <Input name="edition" type="text" placeholder='Edición*' onChange={this.actualizarDatos} value={this.state.edition}/>
              <Input name="lang" type="text" placeholder='Lenguaje*' onChange={this.actualizarDatos} value={this.state.lang}/>
              <Input name="cover_type" type="text" placeholder='Tipo de cubierta*' onChange={this.actualizarDatos} value={this.state.cover_type}/>
              <Input name="recommended_age" type="text" placeholder='Edad recomedada*' onChange={this.actualizarDatos} value={this.state.recommended_age}/>
            </form>
          </div>
        );
        break;
      case "obtener":
        return(
          <div>
            <form>
              
            </form>
          </div>
        );
        break;
      case "actualizar":
        return(
          <div>
            <form>
              
            </form>            
          </div>
        );
        break;
      case "eliminar":
        return(
          <div>
            <form>
              
            </form> 
          </div>
        );
        break;

      default:
        break;
    }
  }

    render(){
      return (
        <div className='botns'>
        <h1>Products</h1>
        <Button name="insertar" onClick={this.handleClick}>INSERTAR PRODUCTOS</Button>
        <Button name="obtener" onClick={this.handleClick}>OBTENER PRODUCTOS</Button>
        <Button name="actualizar" onClick={this.handleClick}>ACTUALIZAR PRODUCTOS</Button>
        <Button name="eliminar" onClick={this.handleClick}>ELIMINAR PRODUCTOS</Button>
        {this.action}
      </div>
      );
    }
  }