import React from 'react';

export default class User_page extends React.Component {

  cambioPagina(){}

    render(){
      return( 
      
      <div>
      <h1>Welcome "inserte nombre aqui"</h1>
      <h2>What do you want to do?...</h2>
      <button>Modify my information</button><br/>
      <button>Consult my information</button><br/>
      <button>I want to delete my profile</button><br/>
      </div>
      );
    }
  }