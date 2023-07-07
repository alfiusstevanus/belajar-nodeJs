const express = require('express')
const expressLayouts = require('express-ejs-layouts')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

//gunakan ejs
app.set('view engine','ejs')

app.use(expressLayouts)

//build middleware untuk bisa akses folfer public
app.use(express.static('public'))

// middleware merubah data di body post menjadi data baru yang bisa dibaca
app.use(express.urlencoded())

//halaman home
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

// halaman about
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Halaman about',
        layout: 'layouts/main.ejs'
    })
})


// halaman kontak
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()
    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main.ejs',
        contacts
    })
})


// halaman detail kontak
app.get('/contact/:nama', async (req, res) => {
    // const contact = findContact(req.params.nama)
    const contact = await Contact.findOne({nama: req.params.nama}) // promise
    res.render('detail',{
        title: 'Detail Contact',
        layout: 'layouts/main.ejs',
        contact
    })
})








app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})