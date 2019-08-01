////////////////////////////////////////////
///////////MODULOS  IMPORTADOS//////////////
////////////////////////////////////////////
var express = require("express");
var app = express();

const Pool = require('pg-pool');

//////////////////////////////////////////////////////
/////CONFIGURACION DE LA PISCINA DE USUARIOS//////////
//////////////////////////////////////////////////////
var config = {
  
  user: 'postgres', //env var: PGUSER
  database: 'Library', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new Pool(config);
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})


//export the query method for passing queries to the pool
function query(text, values, callback) {
  
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
function connect(callback) {
  return pool.connect(callback);
};

var bodyParser = require("body-parser"); // middleware  to handle HTTP POST request
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
///////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////
/////////////////CRUD DEL CLIENTE////////////////////
/////////////////////////////////////////////////////

//insertar un cliente
app.post("/insertClient",function(req,res){

  let str = 'INSERT INTO client VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)'
  let vars = [req.body.username,req.body.first_name, req.body.last_name, req.body.date_birth, req.body.type_id, req.body.id, req.body.password, req.body.phone_number, req.body.address, req.body.email, req.body.credit_card_number, req.body.state]


  connect(function(err,client,done){
    client.query(str,vars,(err, result)=> {
      done(err);
      if(err){
        res.json([{bool:false}]);
        return console.error('error running query',err);
      }
      else{
        res.json([{bool:true}]);

      }
    });
  });
})

//Consultar cliente

app.post("/getClient",function(req,res){

  let str = "SELECT * FROM client WHERE username = $1;";
  let vars = [req.body.username]

  console.log(str);
  connect(function(err,client,done){

    client.query(str, vars,(err,result) => {

      done(err);
      if(err){
        res.json([{bool:false}]);
        return console.error('error runinng query', err);
      }
      else{

        res.json(result.row);
        console.log(res);
      }
    });
  });
})

//Modificar cliente

app.put("/updateClient", function(req,res){

  let str = "UPDATE client SET first_name=$2, last_name=$3, date_birth=$4, type_id=$5, id=$6, password=$7, phone_number=$8, address=$9, email=$10, credit_card_number=$11, state=$12 WHERE username = $1;";
  let vars = [req.body.username, req.body.first_name, req.body.last_name, req.body.date_birth, req.body.type_id, req.body.id, req.body.password, req.body.phone_number, req.body.address, req.body.email, req.body.credit_card_number, req.body.state];

  console.log(str)
  connect(function(err,client,done){

    client.query(str,vars,(err,result)=>{

      done(err);
      if(err){
        res.json([{bool:false}]);
        return console.error('error runinng query', err);
      }
      else{

        res.json(result.now);
        console.log(":v");
      }
    });
  });
})

//Eliminar cliente

app.delete("/deleteClient/:username", function(req,res){

  let str = "DELETE FROM client WHERE username=$1;";
  let vars = [req.params.username];

  console.log(str);
  connect(function(err,client,done){
    client.query(str,vars,(err,result) => {

      done(err);
      if(err){
        res.json([{bool:false}]);
        return console.error('error runinng query', err);
      }
      else{

        res.json(result.now);
        console.log(":v");
      }
    })
  })
})

/////////////////////////////////////////////////////
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
////////////////////////////////////////////////////

