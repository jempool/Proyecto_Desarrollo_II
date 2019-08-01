import React from 'react';
import {Button, Input} from '@material-ui/core'


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
      <Input id='username' type="text"  placeholder='username*' onChange={this.handleChangeUsername} value={this.state.username}></Input><br/>

      <label for="first_name">First name:</label>
      <Input id='first_name' type="text"  placeholder='first_name*' onChange={this.handleChangeFirstName} value={this.state.first_name}></Input><br/>

      <label for="last_name">Last name:</label>
      <Input id='last_name' type="text"  placeholder='last_name*' onChange={this.handleChangeLastName} value={this.state.last_name}></Input><br/>

      <label for="date_birth">Date birth:</label>
      <Input id='date_birth' type="text"  placeholder='date_birth*' onChange={this.handleChangeDateBirth} value={this.state.date_birth}></Input><br/>

      <label for="type_id">Type ID:</label>
      <select id = "type_id"> onChange={this.handleChangeTypeId}
        <option value=" "></option>
        <option value="CC">Cedula de ciudadania</option>
        <option value="TI">Tarjeta de identidad</option>         
      </select><br/>

      <label for="id">ID:</label>
      <Input id='id' type="text"  placeholder='id*' onChange={this.handleChangeId} value={this.state.id}></Input><br/>

      <label for="phone_number">Phone number:</label>
      <Input id='phone_number' type="text"  placeholder='phone_number*' onChange={this.handleChangePhoneNumber} value={this.state.phone_number}></Input><br/>

      <label for="address">Address:</label>
      <Input id='address' type="text"  placeholder='address*' onChange={this.handleChangeAddress} value={this.state.address}></Input><br/>

      <label for="email">Email:</label>
      <Input id='email' type="text"  placeholder='email*' onChange={this.handleChangeEmail} value={this.state.email}></Input><br/>

      <label for="credit_card_number">Credit card number:</label>
      <Input id='credit_card_number' type="text"  placeholder='credit_card_number*' onChange={this.handleChangeCreditCardNumber} value={this.state.credit_card_number}></Input><br/>

      <label for="password">Password:</label>
      <Input id='password' type="text"  placeholder='password*' onChange={this.handleChangePassword} value={this.state.password}></Input><br/>

      <button id='registro' onClick={this.cliente} >SIGN UP</button>
      </div>
        );
    }
  }