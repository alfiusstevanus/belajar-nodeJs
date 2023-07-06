const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts} = require('./utils/contacts')
const {body, validationResult, check} = require('express-validator')

app.use(express.urlencoded({extended:true}))


//gunakan ejs
app.set('view engine','ejs')

app.use(expressLayouts)

//build middleware untuk bisa akses folfer public
app.use(express.static('public'))

// middleware merubah data di body post menjadi data baru yang bisa dibaca
app.use(express.urlencoded())



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


// form tambah data kontak
app.get('/contact/add', (req, res) => {
    res.render('add-contact',{
        title: 'Tambah Kontak',
        layout: 'layouts/main.ejs'
    })
})


// memproses data kontak baru
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value)
        if(duplikat){
            throw new Error('Nama sudah digunakan!')
        }
        return true
    }),
    check('email','Email tidak valid! ').isEmail(),
    check('noHP','No HP tidak valid!').isMobilePhone('id-ID'),

], (req,res) => {
    const errrors = validationResult(req)

    if(!errrors.isEmpty()){
        // return res.status(400).json({errors: errrors.array()})
        res.render('add-contact',{
            title: 'Tambah Kontak',
            layout: 'layouts/main.ejs',
            errors: errrors.array()
        })
    } else{
        addContact(req.body)
        res.redirect('/contact') // ini otomatis pake method get
    }
})

// menghapus kontak 
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    
    if(!contact){
        res.status(404)
        res.send('<h1>404</h1>')
    } else {
        deleteContact(req.params.nama)
        res.redirect('/contact')
    }
})

// form edit data kontak
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('edit-contact',{
        title: 'Edit Kontak',
        layout: 'layouts/main.ejs',
        contact
    })
})

// memproses ubah data kontak 
app.post('/contact/update', [
    body('nama').custom((value, {req}) => {
        const duplikat = cekDuplikat(value)
        if(value !== req.body.oldNama && duplikat){
            throw new Error('Nama sudah digunakan!')
        }
        return true
    }),
    check('email','Email tidak valid! ').isEmail(),
    check('noHP','No HP tidak valid!').isMobilePhone('id-ID'),

], (req,res) => {
    const errrors = validationResult(req)

    if(!errrors.isEmpty()){
        // return res.status(400).json({errors: errrors.array()})
        res.render('edit-contact',{
            title: 'Edit Kontak',
            layout: 'layouts/main.ejs',
            errors: errrors.array(),
            contact: req.body,
        })
    } else{
        updateContacts(req.body)
        res.redirect('/contact') // ini otomatis pake method get
    }
})



// halaman detail kontak
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