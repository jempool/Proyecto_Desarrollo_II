 const express = require('express');
 const router = express.Router();
 const db  =require('../config/database')
 const Category = require('../models/Category')
 const Subcategory = require('../models/Subcategory')


//consulta todas las categorias en la base de datos
router.post("/consultar", (req,res) =>{

  Subcategory.findAll()
    .then(x =>  res.json(x))
    .catch(err => console.log(err));
})


//consulta todas las categorias en la base de datos
router.post("/crear", (req,res) =>{
  
  let {name_subcategory,description,name_category} = req.body

  let errors = [];

  // Validate Fields
  if(!name_subcategory) {
    errors.push({ text: 'Please add a subcategory' });
  }
  if(!description) {
    errors.push({ text: 'Please add description' });
  }
  if(!name_category) {
    errors.push({ text: 'Please add a category'});
  }

  // Check for errors
  if(errors.length > 0) {
    console.log(errors)
  } else {

    // Insert into table
    Subcategory.create({
      name_subcategory,
      description,
      name_category
    })
      .then(x => res.json(x))
      .catch(err => console.log(err));
  }
})



module.exports =router;

/*function (req, res) {

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



 module.exports = router
 */