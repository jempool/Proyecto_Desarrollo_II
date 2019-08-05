const Sequelize = require('sequelize');
const db = require('../config/database');
const Client =require('./Client')

const Message = db.define ('message',{
    username:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    message:{
        type: Sequelize.TEXT,
        primaryKey: true 
    },
    solved:{
        type: Sequelize.BOOLEAN,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})

Message.belongsTo(Client,{foreingkey: 'username', sourcekey:'username'});

module.exports = Message;