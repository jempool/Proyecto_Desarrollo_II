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

  str='INSERT INTO book VALUES ('+req.body.isbn+',\''+ req.body.name_subcategory +'\',\''+ req.body.publication_year +'\',\''+ req.body.synopsis +'\',\''+ req.body.title +'\',\''+ req.body.author +'\','+ req.body.number_of_pages +','+ req.body.price +',\''+ req.body.editorial +'\',\''+ req.body.edition +'\',\''+ req.body.lang +'\',\''+ req.body.cover_type +'\',\''+ req.body.recommended_age+'\')';    
  console.log(str)
  connect(function(err, client, done) {
  client.query(str,(err, result)=> {
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
app.get("/getProduct", function(req,res){

  str='INSERT INTO book VALUES ('+req.body.isbn+',\''+ req.body.name_subcategory +'\',\''+ req.body.publication_year +'\',\''+ req.body.synopsis +'\',\''+ req.body.title +'\',\''+ req.body.author +'\','+ req.body.number_of_pages +','+ req.body.price +',\''+ req.body.editorial +'\',\''+ req.body.edition +'\',\''+ req.body.lang +'\',\''+ req.body.cover_type +'\',\''+ req.body.recommended_age+'\')';    
  console.log(str)
  connect(function(err, client, done) {
  client.query(str,(err, result)=> {
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

//Modificar productos de la base de datos
app.post("/updateProduct", function(req,res){

  str='INSERT INTO book VALUES ('+req.body.isbn+',\''+ req.body.name_subcategory +'\',\''+ req.body.publication_year +'\',\''+ req.body.synopsis +'\',\''+ req.body.title +'\',\''+ req.body.author +'\','+ req.body.number_of_pages +','+ req.body.price +',\''+ req.body.editorial +'\',\''+ req.body.edition +'\',\''+ req.body.lang +'\',\''+ req.body.cover_type +'\',\''+ req.body.recommended_age+'\')';    
  console.log(str)
  connect(function(err, client, done) {
  client.query(str,(err, result)=> {
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

//Eliminar productos de la base de datos
app.delete("/deleteProduct", function(req,res){

  str='INSERT INTO book VALUES ('+req.body.isbn+',\''+ req.body.name_subcategory +'\',\''+ req.body.publication_year +'\',\''+ req.body.synopsis +'\',\''+ req.body.title +'\',\''+ req.body.author +'\','+ req.body.number_of_pages +','+ req.body.price +',\''+ req.body.editorial +'\',\''+ req.body.edition +'\',\''+ req.body.lang +'\',\''+ req.body.cover_type +'\',\''+ req.body.recommended_age+'\')';    
  console.log(str)
  connect(function(err, client, done) {
  client.query(str,(err, result)=> {
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
