const {Sequelize, } = require('sequelize')
const {sequelize} = require('../db')

const Item = sequelize.define('Item', {
    title: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.NUMBER,
    },
    description: {
    type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING
    }})

module.exports = {
    Item
}