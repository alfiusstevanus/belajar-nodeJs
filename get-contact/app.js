const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const {loadContact, findContact} = require('./utils/contacts')


//gunakan ejs
app.set('view engine','ejs')

app.use(expressLayouts)

//build middleware untuk bisa akses folfer public
app.use(express.static('public'))



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
    const contacts = loadContact()
    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main.ejs',
        contacts
    })
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail',{
        title: 'Detail Contact',
        layout: 'layouts/main.ejs',
        contact
    })
})


//akan dijalankan apapun methodnya (menangani ketika tidak ada route)
app.use('/',(req,res) => {
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})