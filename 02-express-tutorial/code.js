const express = require('express');
const app = express();
const { products, people } = require('./data')

app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page</h1>
        <a href = "/api/products" >Products</a>
        `)
})
app.get('/api/products', (req, res) => {
    const newProducts = products.map((p) => {
        const { id, name, image } = p
        return { id, name, image }
    })
    res.json(newProducts)
})

app.get(`/api/products/:productId`, (req, res) => {
    const { productId } = req.params
    const singlrProduct = products.find((product) => product.id === Number(productId))
    if(!singlrProduct){
        return res.status(404).send('product does not exist')
    }
    return res.json(singlrProduct)
})

app.get('/api/v1/query',(req,res)=>{
    const {search , limit} = req.query
    let sortProducts = [...products]
    if(search){
        sortProducts = sortProducts.filter(p=>{
            return p.name.startsWith(search)
        })
    }
    if(limit){
        sortProducts = sortProducts.slice(0,Number(limit))
    }
    if(sortProducts.length<1){
        // res.status(200).send('no products matched you search')
        return res.status(200).json({success : true , data : []})
    }
    res.status(200).json(sortProducts)
})




app.listen(5000, () => {
    console.log('server is lisitening on port 5000....');
})









const express = require('express');
const app = express();
const morgan = require('morgan')
const logger = require('./logger')
const authorize = require('./authorize')

// app.use([logger,authorize])

app.use(morgan('tiny'))



app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>`)
})
app.get('/about', (req, res) => {
    res.send(`<h1>About Page</h1>`)
})
app.get('/api/products', (req, res) => {
    res.send(`<h1>Products Page</h1>`)
})
app.get('/api/items', (req, res) => {
    res.send(`<h1>Items Page</h1>`)
})





app.listen(5000, () => {
    console.log('server is lisitening on port 5000....');
})