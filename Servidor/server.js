////////////////////////////////////////////
///////////MODULOS  IMPORTADOS//////////////
////////////////////////////////////////////
var express = require("express");
var app = express();

const Pool = require('pg-pool');


////////////////////////////////////////////
//////////CONFIGURACION DEL ORM ////////////
////////////////////////////////////////////
const Sequelize = require('sequelize')

const sequelize = new Sequelize('Library', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
})


/////////////////////////////////////////////
/////VERIFICACION DE CONEXION A LA BD////////
/////////////////////////////////////////////

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
})

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

        res.json([{bool:true}]);
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

        res.json([{bool:true}]);
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

        res.json([{bool:true}]);
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
