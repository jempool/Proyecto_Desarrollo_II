const Sequelize = require('sequelize');
const db = require('../config/database')

const Subcategory = db.define ('subcategory',{
    name_subcategory:{
        type: Sequelize.STRING(15),
        primaryKey: true 
    },
    name_category:{
        type: Sequelize.STRING(15),
        primaryKey: true 
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})

module.exports = Subcategory;