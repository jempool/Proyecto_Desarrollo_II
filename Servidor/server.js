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

  return pool.query(text, values, callback );
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

const Book = sequelize.define ('book',{
    isbn:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    name_subcategory:{
        type: Sequelize.TEXT,
    },
    publication_year:{
        type: Sequelize.TEXT,
        allowNull: false        
    },
    synopsis:{
        type: Sequelize.TEXT,
        allowNull: false        
    },
    title:{
        type: Sequelize.TEXT,
        allowNull: false             
    },
    author:{
        type: Sequelize.TEXT,
        allowNull: false             
    },
    number_of_pages:{
        type: Sequelize.INTEGER,
        allowNull: false       
    },
    price:{
        type: Sequelize.BIGINT,
        allowNull: false             
    },
    editorial:{
        type: Sequelize.TEXT,
        allowNull: false             
    },
    edition:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    lang:{
        type: Sequelize.TEXT,
        allowNull: false       
    },
    cover_type:{
        type: Sequelize.STRING(1),
        allowNull: false             
    },
    recommended_age:{
        type: Sequelize.TEXT,
        allowNull: false             
    }
},{
    freezeTableName: true,
    timestamps : false
})

//Modelo de los clientes
const User = sequelize.define ('client',{
  username:{
      type: Sequelize.TEXT,
      primaryKey: true 
  },
  first_name:{
      type: Sequelize.TEXT,
      allowNull: false        
  },
  last_name:{
      type: Sequelize.TEXT,
      allowNull: false        
  },
  date_birth:{
      type: Sequelize.DATEONLY,
      allowNull: false        
  },
  type_id:{
      type: Sequelize.TEXT(2),
      allowNull: false             
  },
  id:{
      type: Sequelize.BIGINT,
      allowNull: false             
  },
  password:{
      type: Sequelize.TEXT,
      allowNull: false       
  },
  phone_number:{
      type: Sequelize.BIGINT,
      allowNull: false             
  },
  gender:{
      type: Sequelize.TEXT(1),
      allowNull: false             
  },
  address:{
      type: Sequelize.TEXT,
      allowNull: false       
  },
  email:{
      type: Sequelize.TEXT,
      allowNull: false       
  },
  credit_card_number:{
      type: Sequelize.BIGINT,
      allowNull: false             
  },
  state:{
      type: Sequelize.BOOLEAN,
      allowNull: false             
  }
},{
  freezeTableName: true,
  timestamps : false
})

//Modelo de las ventas
const Bill = sequelize.define ('bill',{
  id_bill:{
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true
  },
  username:{
      type: Sequelize.TEXT,
      allowNull: false        
  },
  date:{
      type: Sequelize.DATE,
      allowNull: false        
  }
},{
  freezeTableName: true,
  timestamps : false
})

//Modelo de los productos de una venta
const BillBook = sequelize.define ('bill_book',{
  id_bill:{
      type: Sequelize.BIGINT,
      primaryKey: true
  },
  isbn:{
      type: Sequelize.BIGINT,
      allowNull: true        
  },
  quantity:{
      type: Sequelize.INTEGER,
      allowNull: false        
  }
},{
  freezeTableName: true,
  timestamps : false
})

/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS PRODUCTOS////////////////
/////////////////////////////////////////////////////

//Insertar productos en la base de datos
app.post("/insertProduct", function(req,res){

  Book.create(req.body).then(x => res.json(x))
  .catch(err => console.log(err));

})

//Consultar productos de la base de datos
app.post('/getProduct', function(req,res){

  Book.findAll({where: {
    isbn: req.body.isbn
  }})
  .then(x =>  res.json(x))
  .catch(err => console.log(err));

})

//Modificar los datos de un producto especifico de la base de datos
app.put("/updateProduct", function(req,res){

let index = req.body.isbn;
delete req.body.isbn

Book.update(req.body,{where: {
  isbn: index
}}).then(x => res.json(x))
.catch(err => console.log(err));
})

//Eliminar un producto especifico de la base de datos
app.delete('/deleteProduct/:isbn', function(req,res){

  Book.destroy({where: {
    isbn: req.params.isbn
  }}).then(x => res.json(x))
  .catch(err => console.log(err));

})

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
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
////////////////////////////////////////////////////
