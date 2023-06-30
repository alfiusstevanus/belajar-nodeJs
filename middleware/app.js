const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000


//gunakan ejs
app.set('view engine','ejs')

//third party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//build middleware
app.use(express.static('public'))

//aplication level middleware
app.use((req,res,next) =>{
    console.log('Time: '+ Date.now())
    next()
})

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname})
    const mahasiswa = [
        {
        nama: 'akfius',
        nrp: '161214',
        hobi: 'makna'
        },
        {
            nama: 'tumpal',
            nrp: '16121312214',
            hobi: 'tidur'
        }
    ]
    res.render('index',{
        nama: 'alfius',
        title: 'Homepage',
        mahasiswa,
        layout: 'layouts/main.ejs'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Halaman about',
        layout: 'layouts/main.ejs'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main.ejs'
    })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product id: ${req.params.id} <br> Category: ${req.query.category}`)
})

//akan dijalankan apapun methodnya (menangani ketika tidak ada route)
app.use('/',(req,res) => {
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})