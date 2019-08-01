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
///////////CONSULTAS DE LOS PRODUCTOS////////////////
/////////////////////////////////////////////////////

//Insertar productos en la base de datos
app.post("/insertProduct", function(req,res){

  let str='INSERT INTO book VALUES ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 );';    
  let vars = [req.body.isbn,req.body.name_subcategory, req.body.publication_year, req.body.synopsis, req.body.title, req.body.author,req.body.number_of_pages, req.body.price, req.body.editorial, req.body.edition , req.body.lang , req.body.cover_type, req.body.recommended_age];  

  console.log(str);
  connect(function(err, client, done) {
  client.query(str,vars,(err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if(err) {
        res.json([{bool: false }]);
        return console.error('error running query', err);
      }
      else{
        res.json([{bool: true }]);
        console.log("funciono?");
      }
  });
});
})

//Consultar productos de la base de datos
app.post('/getProduct', function(req,res){

  let str="SELECT * FROM book WHERE isbn= $1;";
  let vars=[req.body.isbn];

  console.log(str);
  connect(function(err, client, done) {
    client.query(str, vars,(err, result)=> {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if(err) {
          res.json([{bool: false }]);
          return console.error('error running query', err);
        }
        else{
          res.json(result.rows);
          console.log("funciono?");
        }
    });
  });
})

//Modificar los datos de un producto especifico de la base de datos
app.put("/updateProduct", function(req,res){

  let str="UPDATE book SET name_subcategory=$2, publication_year=$3, synopsis=$4, title=$5, author=$6, number_of_pages=$7, price=$8, editorial=$9, edition=$10, lang=$11, cover_type=$12, recommended_age=$13 WHERE isbn=$1;";
  let vars = [req.body.isbn,req.body.name_subcategory, req.body.publication_year, req.body.synopsis, req.body.title, req.body.author,req.body.number_of_pages, req.body.price, req.body.editorial, req.body.edition , req.body.lang , req.body.cover_type, req.body.recommended_age];  

  console.log(str);
  connect(function(err, client, done) {
  client.query(str,vars,(err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if(err) {
        res.json([{bool: false }]);
        return console.error('error running query', err);
      }
      else{
        res.json([{bool: true }]);
        console.log("funciono?");
      }
  });
});
})

//Eliminar un producto especifico de la base de datos
app.delete('/deleteProduct/:isbn', function(req,res){

  let str="DELETE FROM book WHERE isbn= $1;";
  let vars=[req.params.isbn];

  console.log(str);
  connect(function(err, client, done) {
  client.query(str, vars,(err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      if(err) {
        res.json([{bool: false }]);
        return console.error('error running query', err);
      }
      else{
        res.json([{bool: true }]);
        console.log("funciono?");
      }
  });
});
})

/////////////////////////////////////////////////////
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
////////////////////////////////////////////////////
