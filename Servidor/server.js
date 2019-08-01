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


app.post("/crearSubCategorias", function (req, res) {


  let str;
  let vars=[];
  if(req.body.type==="category"){
    str="INSERT INTO category VALUES($1,$2) "
    vars.push(req.body.name)
    vars.push(req.body.description)
  }
  else{
    str="INSERT INTO subcategory (name_subcategory,name_category,description) VALUES($1,$2,$3) "
    vars.push(req.body.name)
    vars.push(req.body.categoryName)
    vars.push(req.body.description)
  }


  console.log(vars)

    connect(function(err, client, done) {
      if(err) {
          return console.error('error fetching client from pool', err);
      }
      //use the client for executing the query
  
      client.query(str,vars,(err, result) =>{

        console.log(str)
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if(err) {
          res.json({bool:false});
          return console.error('error running query', err);
        }
        else{
          res.json({bool:true});
        }
      });
    });
  });

//consulta los datos de una determinada categoria en la base de datos
app.post("/consultarSubCategorias", function (req, res) {

  let str = "SELECT * FROM "+req.body.table


    connect(function(err, client, done) {
      if(err) {
          return console.error('error fetching client from pool', err);
      }
      //use the client for executing the query
  
      client.query(str,(err, result) =>{
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        res.json(result.rows);
      });
    });
  });

  //Actualiza los datos de un determinado usuario en la base de datos
app.post("/actualizarSubCategorias", function (req, res) {


  let str;
  let vars;
  if(req.body.type==="category"){
     str="UPDATE category SET description=$2 WHERE name_category=$1;"
     vars=[req.body.name,req.body.description]
  }
  else{
     str="UPDATE subcategory SET description=$2,name_category=$3 WHERE name_subcategory=$1;"
     vars=[req.body.name,req.body.description,req.body.categoryName]
  }


  console.log(vars)

    connect(function(err, client, done) {
      if(err) {
          return console.error('error fetching client from pool', err);
      }
      //use the client for executing the query
  
      client.query(str,vars,(err, result) =>{

        console.log(str)
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if(err) {
          res.json({bool:false});
          return console.error('error running query', err);
        }
        else{
          res.json({bool:true});
        }
      });
    });
  });

//elimina los datos de una determinada categoria en la base de datos
app.delete("/eliminarSubCategorias", function (req, res) {


  let str;
  if(req.body.type==="category") str="DELETE FROM category WHERE name_category=$1;"
  else str="DELETE FROM subcategory WHERE name_subcategory=$1;"

  let vars = [req.body.category]

  console.log(vars)

    connect(function(err, client, done) {
      if(err) {
          return console.error('error fetching client from pool', err);
      }
      //use the client for executing the query
  
      client.query(str,vars,(err, result) =>{

        console.log(str)
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if(err) {
          res.json({bool:false});
          return console.error('error running query', err);
        }
        else{
          res.json({bool:true});
        }
      });
    });
  });

/////////////////////////////////////////////////////
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
////////////////////////////////////////////////////
