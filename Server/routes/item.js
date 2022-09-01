const express = require('express')
const { Item } = require('../model/modelIndex')
const app = express()
const cors  = require('cors')

app.use(cors())

app.get('/' , async (req, res) => {
    let quer = await Item.findAll()
    let {id,title, description,price,category,image } = quer
    
    let xy = quer.map((item) => {
        return load = {
            id : item.id,
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

        // if (req.params.item.length <= 2 ) {
        let quer = await Item.findOne({where: {id:req.params.item}})
        if (quer != null) {
            let {id, title, description,price,category,image } = quer
            let load = {
                id : id,
                title: title,
                description : description,
                image : image,
                price : price,
                category : category
            }
            res.send(load)}
        // }
        // else {
            // console.log(req.params.item)
            // let quer = await Item.findOne({where: {title:req.params.item}})
            // if (quer != null) {
                // let {title, description,price,category,image } = quer
                // let load = {
                    // title: title,
                    // description : description,
                    // image : image,
                    // price : price,
                    // category : category
                // }
                // res.send(load)}
        // }
})

app.listen(1234, () => {
    console.log('The server is live and listening at http://localhost:1234')
})
 