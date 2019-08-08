const express = require('express');
const router = express.Router();
const db  =require('../config/database')
const BillBook = require('../models/BillBook')

/////////////////////////////////////////////////////
///////CONSULTAS DE LOS PODUCTOS DE VENTAS///////////
/////////////////////////////////////////////////////

//insertar un producto a un venta
router.post("/insertBillbook",function(req,res){

    BillBook.create(req.body).then(x => res.json(x))
    .catch(err => console.log(err));
  
})

//Consultar un producto en una venta especifica

router.post("/getBillBookv",function(req,res){

    BillBook.findAll({where: {
        id_bill: req.body.id_bill
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

//Consultar las ventas de un producto especifico
router.post("/getBillBookp",function(req,res){

    BillBook.findAll({where: {
        isbn: req.body.isbn
    }})
    .then(x =>  res.json(x))
    .catch(err => console.log(err));

})

//Modificar unproducto en una venta

router.put("/updateBillBook", function(req,res){

    BillBook.update(req.body.quantity,{where: {
        id_bill: req.body.id_bill,
        isbn: req.body.isbn
    }}).then(x => res.json(x))
    .catch(err => console.log(err));

})

//Eliminar un producto en una venta

router.delete("/deleteBillBook/:idbill-:isbn", function(req,res){

    BillBook.destroy({where: {
        id_bill: req.params.idbill,
        isbn: req.params.isbn
    }}).then(x => res.json(x))
    .catch(err => console.log(err));

})
  

module.exports =router;