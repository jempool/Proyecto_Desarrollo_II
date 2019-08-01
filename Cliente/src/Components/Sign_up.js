import React from 'react';



export default class Sign_up extends React.Component {

  constructor(props){
    super(props);

    this.state={

      username:'',
      first_name:'',
      last_name:'',
      date_birth:'',
      type_Id:'',
      id:'',
      password:'',
      phone_number:'',
      address:'',
      email:'',
      credit_card_number:'',
      State:true
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeDateBirth = this.handleChangeDateBirth.bind(this);
    this.handleChangeTypeId = this.handleChangeTypeId.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeCreditCardNumber = this.handleChangeCreditCardNumber.bind(this);
    this.cliente = this.cliente.bind(this);
  }

  handleChangeUsername(event){this.setState({username:event.target.value});}
  handleChangeFirstName(event){this.setState({first_name:event.target.value});}
  handleChangeLastName(event){this.setState({last_name:event.target.value});}
  handleChangeDateBirth(event){this.setState({date_birth:event.target.value});}
  handleChangeTypeId(event){this.setState({type_Id:event.target.value});}
  handleChangeId(event){this.setState({id:event.target.value})}
  handleChangePassword(event){this.setState({password:event.target.value});}
  handleChangePhoneNumber(event){this.setState({phone_number:event.target.value});}
  handleChangeAddress(event){this.setState({address:event.target.value});}
  handleChangeEmail(event){this.setState({email:event.target.value});}
  handleChangeCreditCardNumber(event){this.setState({credit_card_number:event.target.value});}

  cliente(){

    fetch("/insertClient",{
      method:"POST",
      headers:{
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({

      username:this.state.username,
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      date_birth:this.state.date_birth,
      type_Id:this.state.tipe_Id,
      id:this.state.id,
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

    render(){
      
      const username = this.state.username;
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const date_birth = this.state.date_birth;
      const type_Id = this.state.type_Id;
      const id = this.state.id;
      const password = this.state.password;
      const phone_number = this.state.phone_number;
      const address = this.state.address;
      const email = this.state.email;
      const credit_card_number = this.state.credit_card_number;
      const State = this.state.State;

      return (
      <div>
      <h1>Sign up</h1>
      <label for="username">Username:   </label>
      <input type="text" username="username"></input><br/>

      <label for="first_name">First name:</label>
      <input type="text" first_name="first_name"></input><br/>

      <label for="last_name">Last name:</label>
      <input type="text" last_name="last_name"></input><br/>

      <label for="date_birth">Date birth:</label>
      <input id ="date" type="date"></input><br/>

      <label for="type_id">Type ID:</label>
      <select id = "type_id">
        <option value=" "></option>
        <option value="CC">Cedula de ciudadania</option>
        <option value="TI">Tarjeta de identidad</option>         
      </select><br/>

      <label for="id">ID:</label>
      <input type="int" id="id"></input><br/>

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

      <button id='registro' onClick={this.cliente} >SIGN UP</button>
      </div>
        );
    }
  }