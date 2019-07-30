import React from 'react';

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      isbn : 123421,
      name_subcategory: "JUVENIL",
      publication_year: "1998",
      synopsis: "Que wen libro",
      title: "Ddshsgaerg",
      author: "Steban Cadena",
      number_of_pages: 342,
      price: 345421, 
      editorial: "Planeta",
      edition: "SECOND",
      lang: "Español",
      cover_type: "G",
      recommended_age: 15 
    }


    this.prueba = this.prueba.bind(this);
  }

  prueba(){

      fetch("/insertProduct",{
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isbn : 123421,
          name_subcategory: this.state.isbn,
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

    render(){
      return (
        <div className='botns'>
        <h1>Products</h1>
        <button id='b1' key="6" onClick={this.prueba}>Prueba de INSERT PRODUCTS</button>
      </div>
      );
    }
  }