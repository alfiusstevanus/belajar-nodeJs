const yargs = require('yargs')
const { simpanContact } = require('./contacts')
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
        const contact = {
            nama: argv.nama,
            email: argv.email,
            noHP: argv.noHP
        }
    simpanContact(argv.nama, argv.email, argv.noHP)
    }
})

yargs.parse()
// const {tulisPertanyaan, simpanContact} = require('./contacts')
// const main = async ()=>{
//     const nama = await tulisPertanyaan('Masukan nama Anda: ')
//     const email = await tulisPertanyaan('Masukan Email Anda: ')
//     const noHP = await tulisPertanyaan('Masukan nomor HP Anda: ')
//     simpanContact(nama, email, noHP)
// }
// main()


// rl.question('Masukan nama Anda: ', (nama) => {
//     rl.question('Masukan no HP: ', (noHP) => {
//         const contact = { nama, noHP }
//         const file = fs.readFileSync('data/contacts.json', 'utf-8') //berupa string
//         const contacts = JSON.parse(file) //string menjadi json

//         contacts.push(contact) //berbentuk json

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 4)) // json menjadi string

//         console.log('Terimakasih sudah memasukkan data')

//         rl.close()
//     })
// })