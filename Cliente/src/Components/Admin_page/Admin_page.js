import React, { Component } from "react";
import { Select } from '@material-ui/core';
import { JsonToTable } from "react-json-to-table";
import "./Admin_page.css"
import Dashboard from "./Dashboard";


class Admin_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: {
        Client: []
      },
      status: "Select"
    };
    this.handleClick = this.handleClick.bind(this);
    this.getClient = this.getClient.bind(this);
    this.getClient()
  }


  getClient() {
    fetch("/Client/consult", {
      method: "GET",
    })

      .then(res => res.json())
      .then(res => {
        this.setState({ algo: { Client: [] } });
        this.setState({ algo: res[0] });
      });

  }


  handleClick(e) {

    fetch("/Client/desactivate", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ client: this.state.status })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ algo: { Client: [] } });
      })
      .then(() => {
        this.getClient()
      });
  }

  updateInputValue = (evt) => {
    this.setState({
      textBox: evt.target.value
    });
  }


  render() {
    console.log(this.state.algo)
    return (
      <div>
        <Dashboard handleList={this.handleList} />
        <button onClick={this.handleClick}>Clientes</button>
      </div>);

    // <div>
    //   <JsonToTable json={this.state.algo} />
    //   <br />
    //   <button id="desactivar" onClick={this.handleClick}>activate/deactivate</button>
    //   <Select
    //     name="categoryName"
    //     value={this.state.status}
    //     onChange={(x) => this.setState({ status: x.target.value })}
    //     placeholder="Selecciona una subcategoria:"
    //   >
    //     <option value="Select" >
    //       Selecciona una categoria:
    //               </option>
    //     {this.state.algo.Client.map(x =>
    //       <option value={x.username} key={x.username}>
    //         {x.username}
    //       </option>)}
    //   </Select>
    // </div>);
  }
}

export default Admin_page;