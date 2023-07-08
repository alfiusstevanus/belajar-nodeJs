const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {body, validationResult, check} = require('express-validator')
const methodOverride = require('method-override')

require('./utils/db')
const Contact = require('./model/contact')

const app = express()
const port = 3000

//setup method override
app.use(methodOverride('_method'))


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


// form tambah data kontak
app.get('/contact/add', (req, res) => {
    res.render('add-contact',{
        title: 'Tambah Kontak',
        layout: 'layouts/main.ejs'
    })
})


// memproses tambah data kontak baru
app.post('/contact', [
    body('nama').custom( async(value) => {
        const duplikat = await Contact.findOne({nama: value})
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
        res.render('add-contact',{
            title: 'Tambah Kontak',
            layout: 'layouts/main.ejs',
            errors: errrors.array()
        })
    } else{
        Contact.insertMany(req.body, (error, result) => {
            res.redirect('/contact') // ini otomatis pake method get
        })
    }
})

// menghapus kontak 
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama:req.params.nama})    
//     if(!contact){
//         res.status(404)
//         res.send('<h1>404</h1>')
//     } else {
//         Contact.deleteOne({_id: contact._id}).then(() => {
//             res.redirect('/contact')
//         })
//     }
// })

// menghapus kontak 
app.delete('/contact', (req,res) => {
    Contact.deleteOne({nama: req.body.nama}).then(() => {
        res.redirect('/contact')
    })
})


// form edit data kontak
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama})
    res.render('edit-contact',{
        title: 'Edit Kontak',
        layout: 'layouts/main.ejs',
        contact
    })
})

// memproses ubah data kontak 
app.put('/contact', [
    body('nama').custom(async (value, {req}) => {
        const duplikat = await Contact.findOne({nama:value})
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
        res.render('edit-contact',{
            title: 'Edit Kontak',
            layout: 'layouts/main.ejs',
            errors: errrors.array(),
            contact: req.body,
        })
    } else{
        Contact.updateOne(
            {
            _id:req.body._id
            },
            {
                $set:{
                    nama: req.body.nama,
                    email: req.body.email,
                    noHP: req.body.noHP
                }
            }
        ).then(result => {
            res.redirect('/contact') // kalo ini otomatis pake method get
        })
    }
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