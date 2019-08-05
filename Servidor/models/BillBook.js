const Sequelize = require('sequelize');
const db = require('../config/database');
const Bill  = require( './Bill')
const Book  = require( './Book')

const BillBook = db.define ('bill_book',{
    id_bill:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    ISBN:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})

BillBook.belongsTo(Bill,{foreingkey: 'id_bill', sourcekey:'id_bill'});
BillBook.hasMany(Book,{foreingkey: 'ISBN', sourcekey:'ISBN'});

module.exports = BillBook;