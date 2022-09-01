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
})

app.listen(1234, () => {
    console.log('The server is live and listening at http://localhost:1234')
})
