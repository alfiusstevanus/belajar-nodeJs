const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/belajar-mongo',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

// menambah 1 data
// const contact1 = new Contact({
//     nama: 'doddy',
//     noHP: '087712313',
//     email: 'doddy@gmail.com'
// })

// // simpan ke dB
// contact1.save().then((contact) => console.log(contact))
