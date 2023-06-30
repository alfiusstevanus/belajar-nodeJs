const yargs = require('yargs')
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts')
//core modules
// const { rejects } = require('assert')
// const { resolve } = require('path')

//mengambil argumen dari command line
// yargs.command('add','menambahkan kontak baru',() => {}, (argv) => {
//     console.log(argv.nama)
// })
yargs.command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demanOption: false,
            type: 'string'
        },
        noHP:{
            describe: 'No Handphone',
            demanOption: true,
            type: 'string'
        }
    },
    handler(argv){
    simpanContact(argv.nama, argv.email, argv.noHP)
    }
})
.demandCommand()

//menampilkan daftar nama kontak beserta no HP
yargs.command({
    command: 'list',
    describe: 'menampilkan daftar nama kontak beserta no HP',
    handler(){
        listContact()
    }
})

//menampilkan detail kontak
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail sebuah kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string'
        },
    },
    handler(argv){
        detailContact(argv.nama)
    }
    
})

//menghapus kontak kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'menghapus kontak kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string'
        },
    },
    handler(argv){
        deleteContact(argv.nama)
    }
    
})

yargs.parse()