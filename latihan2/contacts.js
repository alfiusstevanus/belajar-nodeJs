const fs = require('fs')
//menuliskan string ke file (sync)
// try {
//     fs.writeFileSync('test.txt', 'helo world secara syncronus')
// } catch (error) {
//     console.log(error)
// }

//menuliskan string ke file (async)
// fs.writeFile('test.txt','helo world asyncronus',(error) => {
//     console.log(error)
// })

//menuliskan file (sync)
// const data = fs.readFileSync('test.txt', 'utf-8') //utf-8 untuk merubah kode bufer menjadi teks string
// console.log(data)

// //menuliskan file (async)
// fs.readFile('test.txt','utf-8',(error,data) =>{
//     if(error) throw error
//     console.log(data)
// })

//readline

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) =>{
        rl.question(pertanyaan, (nama) => {
            resolve(nama)
        })
    })
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP }
    const file = fs.readFileSync('data/contacts.json', 'utf-8') //berupa string
    const contacts = JSON.parse(file) //string menjadi json

    contacts.push(contact) //berbentuk json

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 4)) // json menjadi string

    console.log('Terimakasih sudah memasukkan data')

    rl.close()
}

module.exports = {tulisPertanyaan, simpanContact}

// const pertanyaan2 = () => {
//     return new Promise((resolve, reject) =>{
//         rl.question('Masukan Email: ', (email) => {
//             resolve(email)
//         })
//     })
// }