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
    
    const contact = contacts.find(contact => contact.nama === nama)
    return contact
}

// menimpa contacts.json dengan data yang baru
const saveContact = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 4))
}


// menambahkan data contact baru
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContact(contacts)
}


// cek nama yg duplikat
const cekDuplikat = (nama) => {
    const contact = loadContact()
    return contact.find((contact) => contact.nama === nama)
}


//hapus kontak
const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter(contact => contact.nama !== nama)

    if(contacts.length === newContacts.length){
        console.log(`${nama} tidak ditemukan!`)
        return false
    }

    saveContact(newContacts)

    console.log(`${nama} berhasil dihapus!`)
}

const updateContacts = (contactBaru) => {
    deleteContact(contactBaru.oldNama)
    const contact = loadContact()
    delete contactBaru.oldNama //hapus oldNama
    contact.push(contactBaru)
    saveContact(contact)
}


module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}