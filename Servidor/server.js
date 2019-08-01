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
////////////////////////////////////////////////////
