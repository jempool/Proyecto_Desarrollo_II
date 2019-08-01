import React from 'react';

export default class User_page extends React.Component {

  constructor(props){
    super(props);

    this.state={

      first_name:'',
      last_name:'',
      date_birth:'',
      password:'',
      phone_number:'',
      address:'',
      email:'',
      credit_card_number:'',
      State:true

    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLasttName = this.handleChangeLasttName.bind(this);
    this.handleChangeDateBirth = this.handleChangeDateBirth.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeCreditCardNumber = this.handleChangeCreditCardNumber.bind(this);

    this.modCliente = this.modCliente.bind(this);
  }

  modCliente(){
    fetch("/modifyClient",{
      method:"POST",
      headers:{
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        date_birth:this.state.date_birth,
        password:this.state.password,
        phone_number:this.state.phone_number,
        address:this.state.address,
        email:this.state.email,
        credit_card_number:this.state.credit_card_number,
        State:this.state.State
      })
    })
    .then(res => res.json())
    .then(res => {})
  }

  consultClient(){
    fetch("/consultClient",{
      method:"GET",
      headers:{
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        username:this.state.username
      })
    })
    .then(res => res.json())
    .then(res => {})
  }

  deleteClient(){
    fetch("/deleteClient",{
      method:"DELETE",
      headers:{
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        username:this.state.username
      })
    })
    .then(res => res.json())
    .then(res => {})
  }

  cambioPagina(e){

    switch(e.event.id){

      case "modify":
        return(
          <div>
            <h1>Edit your information</h1>
            <label for="first_name">First name:</label>
            <input type="text" first_name="first_name"></input><br/>

            <label for="last_name">Last name:</label>
            <input type="text" last_name="last_name"></input><br/>

            <label for="date_birth">Date birth:</label>
            <input id ="date" type="date"></input><br/>

            <label for="phone_number">Phone number:</label>
            <input type="text" phone_number="phone_number"></input><br/>

            <label for="address">Address:</label>
            <input type="text" address="address"></input><br/>

            <label for="email">Email:</label>
            <input type="text" email="email"></input><br/>

            <label for="credit_card_number">Credit card number:</label>
            <input type="text" credit_card_number="credit_card_number"></input><br/>

            <label for="password">Password:</label>
            <input type="password" password="password"></input><br/>

            <button id='modify' onClick={this.modcliente} >Edit</button>

          </div>
        );
        break;

      case 'consult':

          return(
            <div>
              <h1>Edit your information</h1>
              <label for="username">Username:</label>
              <input type="text" username="username"></input><br/>

              <button id='consult' onClick={this.consultClient} >Consult</button>
  
            </div>
          );

        break;

      case 'delete':

          return(
            <div>
              <h1>Edit your information</h1>
              <label for="username">Username:</label>
              <input type="text" username="username"></input><br/>

              <button id='delete' onClick={this.deleteClient} >Delete</button>
  
            </div>
          );

        break;
    }
  }

    render(){
      return( 
      
      <div>
      <h1>Welcome "inserte nombre aqui"</h1>
      <h2>What do you want to do?...</h2>
      <button id='modify'>Modify my information</button><br/>
      <button id='consult'>Consult my information</button><br/>
      <button id='delete'>I want to delete my profile</button><br/>
      </div>
      );
    }
  }