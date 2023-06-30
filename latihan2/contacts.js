const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

//membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

//membuat contacts.json jika blm ada
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8')
}


const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8') //berupa string
    const contacts = JSON.parse(file) //string menjadi json
    return contacts
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP }
    const contacts = loadContact()

    //cek duplikasi
    const duplikat = contacts.find((contact) => contact.nama = nama)
    if(duplikat){
        console.log(chalk.red.inverse.bold('Kontak sudah terdaftar gunakan nama lain!'))
        return false
    } 

    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid!'))
            return false
        } 
    }

    //cek noHP
    if(!validator.isMobilePhone(noHP,'id-ID')){
        console.log(chalk.red.inverse.bold('NO HP tidak valid!'))
        return false
    } 


    contacts.push(contact) //berbentuk json

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 4)) // json menjadi string

    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data'))
}



const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('Daftar kontak: '))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`)
    })
}

const detailContact = nama => {
    const contacts = loadContact()
    
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())
    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`))
        return false
    }

    console.log('Nama: ' + chalk.cyan.inverse.bold(contact.nama))
    if(contact.email){
        console.log('Email: ' + chalk.cyan.inverse.bold(contact.email))
    }
    console.log('No HP: ' + chalk.cyan.inverse.bold(contact.noHP))
}


const deleteContact = nama => {
    const contacts = loadContact()

    const newContacts = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`))
        return false
    }


    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 4)) // menimpa ke contacts.json

    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus!`))

}


module.exports = {simpanContact, listContact, detailContact, deleteContact}