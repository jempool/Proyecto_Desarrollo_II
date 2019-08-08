const express = require('express');
const router = express.Router();
const bd  =require('../config/database')
const Client = require('../models/Client')


/////////////////////////////////////////////////////
///////////CONSULTAS DE LOS CLIENTES/////////////////
/////////////////////////////////////////////////////

//Insertar productos en la base de datos
router.post("/insert", function(req,res){

    delete req.body.tipo

    Client.create(req.body)
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        cosnole.log(err)
        res.json([{bool:false}])
    });
  
})
//consulta todas las subcategorias en la base de datos
router.get("/consult", (req,res) =>{

    Client.findAll({
        attributes: ['username', 'first_name', 'last_name', 'date_birth', 'type_id', 'id', 'phone_number', 'address',
         'email', 'credit_card_number',[bd.cast(bd.col('state'),'VARCHAR(5)'),'state']]
    })
    .then(x => res.json([{Client:x}]))
    .catch(err => {
        console.log(err)
        res.json({bool:false})
    });
  });

//consulta todas las subcategorias en la base de datos
router.post("/get", (req,res) =>{
    

    Client.findAll({where: req.body})
    .then(x => res.json(x))
    .catch(err => {
        console.log(err)
        res.json({bool:false})
    });
});


//Modificar los datos de un producto especifico de la base de datos
router.post("/desactivate", function(req,res){

    let index = req.body.client;
    
    Client.findAll({where: {
        username: index
    }})
    .then(x =>{
        Client.update({
            state:!x[0].state
        },{where: {
            username: x[0].username
        }})
        .then(x => res.json([{ client: [] }]))
        .catch(err => {
            console.log(err)
            res.json([{ client: [] }])
        });

    })
    .catch(err => {
        console.log(err)
        res.json([{ client: [] }])
    })


})


//Eliminar un producto especifico de la base de datos
router.delete('/delete', function(req,res){
    console.log(req.body)

    Client.destroy({where: req.body})
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });

})


//Modificar cliente

router.post("/update", function(req,res){
  
    let index = req.body.username;
    delete req.body.username
    
    Client.update(req.body,{where: {
      username: index
    }})
    .then(x => res.json([{bool:true}]))
    .catch(err => {
        console.log(err)
        res.json([{bool:false}])
    });
  
  })



module.exports =router;