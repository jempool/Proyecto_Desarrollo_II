import React from 'react';
import {Input ,Select,TextField,Button } from '@material-ui/core'



export default class Sign_up extends React.Component {

  constructor(props){
    super(props);

    this.state={

      username:'',
      first_name:'',
      last_name:'',
      date_birth:'',
      type_id:'CC',
      id:'',
      password:'',
      phone_number:'',
      address:'',
      email:'',
      credit_card_number:'',
      state:true
    }
   
    this.cliente = this.cliente.bind(this);
  }


  cliente(){

    fetch("/insertClient",{
      method:"POST",
      headers:{
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res => {
      if(res[0]){
        console.log("SI CREO ")
      }
      else{
        console.log("NO CREO ")
      }
      this.setState(
        {
          username:'',
          first_name:'',
          last_name:'',
          date_birth:'',
          type_id:'CC',
          id:'',
          password:'',
          phone_number:'',
          address:'',
          email:'',
          credit_card_number:'',
          state:true
        }
      )
    })
  }

    render(){ 
      
     
      return (
      <div>
      <h1>Sign up</h1>
      <label for="username">Username:   </label>
      <Input type="text" onChange={(x)=>this.setState({username:x.target.value})}value={this.state.username}></Input><br/>

      <label for="first_name">First name:</label>
      <Input type="text" onChange={(x)=>this.setState({first_name:x.target.value})} value={this.state.first_name }></Input><br/>

      <label for="last_name">Last name:</label>
      <Input type="text" onChange={(x)=>this.setState({last_name:x.target.value})} value={this.state.last_name}></Input><br/>

      <label for="date_birth">Date birth:</label>
      <TextField type ="date" onChange={(x)=>this.setState({date_birth:x.target.value})} value={this.state.date_birth}></TextField><br/>

      <label for="type_id">Type ID:</label>
      <Select onSelect={(x)=>this.setState({type_id:x.target.value})} value="CC">
        <option value="CC">Cedula de ciudadania</option>
        <option value="TI">Tarjeta de identidad</option>         
        <option value="RC">Registro Civil</option>         
        <option value="TP">Pasaporte</option>         
      </Select><br/>

      <label for="id">ID:</label>
      <Input type="int" onChange={(x)=>this.setState({id:x.target.value})}  value={this.state.id}></Input><br/>

      <label for="phone_number">Phone number:</label>
      <Input type="text" onChange={(x)=>this.setState({phone_number:x.target.value})} value={this.state.phone_number}></Input><br/>

      <label for="address">Address:</label>
      <Input type="text" onChange={(x)=>this.setState({address:x.target.value})} value={this.state.address}></Input><br/>

      <label for="email">Email:</label>
      <Input type="text" onChange={(x)=>this.setState({email:x.target.value})} value={this.state.email}></Input><br/>

      <label for="credit_card_number">Credit card number:</label>
      <Input type="text" onChange={(x)=>this.setState({credit_card_number:x.target.value})} value={this.state.credit_card_number}></Input><br/>

      <label for="password">Password:</label>
      <Input type="password" onChange={(x)=>this.setState({password:x.target.value})} value={this.state.password}></Input><br/>

      <Button onClick={this.cliente} >SIGN UP</Button>
      </div>
        );
    }
  }