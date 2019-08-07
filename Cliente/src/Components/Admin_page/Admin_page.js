import React, { Component } from "react";
import { JsonToTable } from "react-json-to-table";
import "./Admin_page.css"


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
      },
      textBox: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
 

  handleClick(e) {

    if (e.target.id === "desactivar") {
      console.log(this.state.textBox);
      fetch("/customers", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: e.target.id, client: this.state.textBox })
      })
      .then(res => res.json())
      .then(res => {
        this.setState({ algo: "" });
        this.setState({ algo: res[0] });
      }); 
    }

    if (e.target.id === "cliente") {
      fetch("/customers", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: e.target.id, client: "" })
      })

        .then(res => res.json())
        .then(res => {

          this.setState({ algo: "" });
          this.setState({ algo: res[0] });

          //console.log(this.state.algo.client[0].state);
        });
    } 
  }
  
  updateInputValue = (evt) => {
    this.setState({
      textBox: evt.target.value
    });
  }


  render() {

/*
    const tab = (
      <tbody>
        <tr>
          <td >1</td>
          <td>2</td>
          <button>b</button>
        </tr>
    </tbody>);*/

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
        <button id="cliente" onClick={this.handleClick}>Clients</button>
        <JsonToTable json={this.state.algo} />
        <br />
        <button id="desactivar" onClick={this.handleClick }>activate/deactivate</button>
        <input type="text" onChange={this.updateInputValue} />


        {/* <Table id="table" border="1">
          <th>username</th>  <th>first_name</th> <th>last_name</th>
          <th>date_birth</th> <th>type_id</th> <th>id</th>
          <th>phone_number</th> <th>address</th> <th>email</th>
          <th>state</th><th>change</th>

{tab} */}

        {/* <tr>
            <td >1</td>
            <td>2</td>
            <button>b</button>
          </tr>

          <tr>
            <td>3</td>
            <td>4</td>
            <button>b</button>
          </tr> */}

        {/* </Table> */}




      </div>);


  }
}

export default Admin_page;