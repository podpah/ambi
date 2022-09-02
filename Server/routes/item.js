const express = require('express')
const { Item } = require('../model/modelIndex')
const app = express()
const cors  = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.post('/add', async(req,res)=>{
    await res.send(req.body)
    await Item.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    })
})

app.get('/' , async (req, res) => {
    let quer = await Item.findAll()
    let {id, title, description,price,category,image } = quer
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

})

app.put('/update/:id', async(req, res)=>{
    const targetItem = String(req.params.id)
    let query = await Item.findOne({
    where:{
        id: targetItem
    }
    })
 
    await query.update({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    })
    console.log(query)
    res.sendStatus(200)
})

app.delete('/:item', async (req,res) => {

    let chees = await Item.findOne({where: {id:req.params.item}})
    await Item.destroy({where:{id:req.params.item}})
    chees = await Item.findOne({where: {id:req.params.item}})
    res.sendStatus(200)

})

app.delete('/delete/:item', async (req,res) => {

    let chees = await Item.findOne({where: {id:req.params.item}})
    await Item.destroy({where:{id:req.params.item}})
    chees = await Item.findOne({where: {id:req.params.item}})
    res.sendStatus(200)

})

app.listen(1234, () => {
    console.log('The server is live and listening at http://localhost:1234')
})
