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
    //base de datos pendiente por configurar
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
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
////////////////////////////////////////////////////
