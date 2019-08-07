const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const Category = require('../models/Category')


//consulta todas las subcategorias en la base de datos
router.get("/consult", (req,res) =>{

 Category.findAll()
   .then(x =>  res.json(x))
   .catch(err => console.log(err));
})



//consulta todas las subcategorias en la base de datos
router.post("/create", (req,res) =>{
  
  let {name_category,description} = req.body


  // Insert into table
  Category.create({
    description,
    name_category
  })
    .then(x =>res.json({bool:true}))
    .catch(err => res.json({bool:false}));
  
})


module.exports =router;