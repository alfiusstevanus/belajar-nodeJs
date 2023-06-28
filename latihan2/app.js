//core modules
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

rl.question('Masukan nama Anda: ', (nama) => {
    rl.question('Masukan no HP: ', (noHP) => {
        const contact = { nama, noHP }
        const file = fs.readFileSync('contacts.json', 'utf-8') //berupa string
        const contacts = JSON.parse(file) //string menjadi json

        contacts.push(contact) //berbentuk json

        fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 4)) // json menjadi string

        console.log('Terimakasih sudah memasukkan data')

        rl.close()
    })
})