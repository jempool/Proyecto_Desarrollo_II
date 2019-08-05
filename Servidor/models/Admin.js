const Sequelize = require('sequelize');
const db = require('../config/database');

const Admin = db.define ('admin',{
    id:{
        type: Sequelize.STRING(9),
        primaryKey: true 
    },
    password:{
        type: Sequelize.BIGINT,
        allowNull: false     
    },
    username:{
        type: Sequelize.TEXT,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Admin;