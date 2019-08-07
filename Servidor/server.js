////////////////////////////////////////////
///////////MODULOS  IMPORTADOS//////////////
////////////////////////////////////////////
var express = require("express");
var app = express();

const Pool = require('pg-pool');


////////////////////////////////////////////
//////////CONFIGURACION DEL ORM ////////////
////////////////////////////////////////////
const Sequelize = require('sequelize');

const sequelize = new Sequelize('Library', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
})
const db = require('./config/database.js')


/////////////////////////////////////////////
/////VERIFICACION DE CONEXION A LA BD////////
/////////////////////////////////////////////

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto'+err)
}) 



var bodyParser = require("body-parser"); // middleware  to handle HTTP POST request
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


app.use('/Category', require('./routes/Category'));
app.use('/Subcategory', require('./routes/Subcategory'));
app.use('/Book',require('./routes/Book'));


/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS CLIENTES/////////////////
/////////////////////////////////////////////////////

//insertar un cliente
app.post("/insertClient",function(req,res){

  User.create(req.body).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Consultar cliente

app.post("/getClient",function(req,res){

  User.findAll({where: {
    username: req.body.username
  }})
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Consultar clientes

app.post("/getClients",function(req,res){

  User.findAll()
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Consultar clientes filtrados por genero

app.post("/getClientsg",function(req,res){

  User.findAll({where: {
    gender: req.body.gender
  }})
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Modificar cliente

app.put("/updateClient", function(req,res){
  
  let index = req.body.username;
  delete req.body.username
  
  User.update(req.body,{where: {
    username: index
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Eliminar cliente

app.delete("/deleteClient/:username", function(req,res){

  User.destroy({where: {
    username: req.params.username
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

/////////////////////////////////////////////////////
////////////CONSULTAS DE LAS VENTAS//////////////////
/////////////////////////////////////////////////////

//insertar una venta
app.post("/insertBill",function(req,res){

  Bill.create(req.body).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Consultar las ventas

app.post("/getBills",function(req,res){

  Bill.findAll()
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Consultar una venta

app.post("/getBill",function(req,res){

  Bill.findAll({where: {
    id_bill: req.body.id_bill
  }})
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Modificar una venta

app.put("/updateBill", function(req,res){
  
  let index = req.body.id_bill;
  delete req.body.id_bill
  
  Bill.update(req.body,{where: {
    id_bill: index
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Eliminar una venta

app.delete("/deleteClient/:idbill", function(req,res){

  Bill.destroy({where: {
    id_bill: req.params.idbill
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

/////////////////////////////////////////////////////
///////CONSULTAS DE LOS PODUCTOS DE VENTAS///////////
/////////////////////////////////////////////////////

//insertar un producto a un venta
app.post("/insertBillbook",function(req,res){

  BillBook.create(req.body).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Consultar un producto en una venta especifica

app.post("/getBillBookv",function(req,res){

  BillBook.findAll({where: {
    id_bill: req.body.id_bill
  }})
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Consultar las ventas de un producto especifico
app.post("/getBillBookp",function(req,res){

  BillBook.findAll({where: {
    isbn: req.body.isbn
  }})
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Modificar unproducto en una venta

app.put("/updateBillBook", function(req,res){
  
  BillBook.update(req.body.quantity,{where: {
    id_bill: req.body.id_bill,
    isbn: req.body.isbn
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Eliminar un producto en una venta

app.delete("/deleteBillBook/:idbill-:isbn", function(req,res){

  BillBook.destroy({where: {
    id_bill: req.params.idbill,
    isbn: req.params.isbn
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// 
app.post("/customers", function (req, res) {

  if (req.body.action === "cliente") {


    let str = "SELECT username, first_name, last_name, date_birth, type_id, id, phone_number, address, email, credit_card_number, state::CHAR(5) FROM public.client;";

    connect(function (err, client, done) {

      if (err) {
        return console.error('error fetching client from pool', err);
      }
      //use the client for executing the query
      client.query(str, (err, result) => {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);


        if (err) {
          res.json([{ client: [] }]);
          return console.error('error running query', err);
        }
        else {
          res.json([{ client: result.rows }]);
        }
      })
    });

  }
  if (req.body.action === "desactivar") {
    let st;
    console.log(req.body.client, " -> ");
    let str1 = "SELECT state FROM public.client where username='" + req.body.client + "';"

    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      client.query(str1, (err, result) => {
        done(err);
        if (err) {
          res.json([{ client: [] }]);
          return console.error('error running query', err);
        }
        else {
          st = result.rows;
        }
      })
    });

    //--
    connect(function (err, client, done) {
      console.log(!st);
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      client.query("UPDATE public.client SET state=" + !st + " WHERE username='" + req.body.client + "';", (err, result) => {
        done(err);
        if (err) {
          res.json([{ client: [] }]);
          return console.error('error running query', err);
        }
        // else           
        //   console.log("activate/deactivate");              
      })
    });
    //--


  }

});

/////////////////////////////////////////////////////
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});