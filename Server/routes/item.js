const express = require('express')
const { Item } = require('../model/modelIndex')
const app = express()
const cors  = require('cors')
const e = require('cors')

app.use(cors())

app.get('/' , async (req, res) => {
    let quer = await Item.findAll()
    let {title, description,price,category,image } = quer
    
    let xy = quer.map((item) => {
        return load = {
            title: item.title,
            description : item.description,
            image : item.image,
            price : item.price,
            category : item.category
        }
    })
    
    res.send(xy)
})


app.get('/:item', async (req,res) => {


    if (req.params.item.length <= 2) {
        let quer = await Item.findOne({where: {id:req.params.item}})
        if (quer != null) {
            let {title, description,price,category,image } = quer
            let load = {
                title: title,
                description : description,
                image : image,
                price : price,
                category : category
            }
            res.send(load)}
        else {res.sendStatus(404)}
    }

    else {
        console.log(req.params.item)
        let que = req.params.item
        let quer = await Item.findOne({where: {title:que}})
        console.log(quer)
        if (quer != null) {
            let {title, description,price,category,image } = quer
            let load = {
                title: title,
                description : description,
                image : image,
                price : price,
                category : category
            }
            res.send(load)}
        else {res.sendStatus(404)}
    }
})

app.delete('/:item', async (req,res) => {

    if(req.params.item.length <= 2) {
    let chees = await Item.findOne({where: {id:req.params.item}})
    await Item.destroy({where:{id:req.params.item}})
    chees = await Item.findOne({where: {id:req.params.item}})
    res.sendStatus(200)
    }

    else {
        let quer = req.params.item
        let item = await Item.findOne({where: {title:quer}})
        await Item.destroy({where:{title:quer}})
        item = await Item.findOne({where: {title:quer}})
        res.sendStatus(200)
    }
})

app.listen(1234, () => {
    console.log('The server is live and listening at http://localhost:1234')
})
