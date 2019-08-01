import React, { Component } from "react";
import Dashboard from "./Dashboard"
import { JsonToTable } from "react-json-to-table";


class Admin_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: {
        Clientes: [
          {
            username: "---", first_name: "---", last_name: "---", date_birth: "---",
            type_id: "---", id: "---", phone_number: "---", address: "---",
            email: "---", state: "---"
          },
          {
            username: "", first_name: "", last_name: "", date_birth: "",
            type_id: "", id: "", phone_number: "", address: "",
            email: "", state: ""
          }]
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // handleList = (e) => {
  //   console.log(e); return;
  // };

  handleClick() {
    console.log("hola");
    fetch("/customers", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Username: "jem", Password: "123" })
    })

      .then(res => res.json())
      .then(res => {
        
        this.setState({ algo: "" });
        this.setState({ algo: res[0] });
        
        console.log(this.state.algo.client[0].state);
      });

  }


  render() {
    return (
      // <div>
      //   <Dashboard handleList={this.handleList}/>
      //   <button onClick={this.handleClick}>Clientes</button>
      //   <ul>
      //   {result.map(item => {
      //       return <li>{item[1]}</li>;
      //     })}
      //   </ul>
      //   </div>);

      <div>
        <button onClick={this.handleClick}>Clientes</button>
        <JsonToTable json={this.state.algo} />
        <br />
        <button onClick={console.log("Desactivar")}>Desactivar</button>
      </div>);

  }
}

export default Admin_page;