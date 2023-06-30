const fs = require('fs')


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


//mengambil semua data contact
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8') //berupa string
    const contacts = JSON.parse(file) //string menjadi json
    return contacts
}


//mencari contact berdasarkan nama
const findContact = nama => {
    const contacts = loadContact()
    
    const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact
}


module.exports = {loadContact, findContact}