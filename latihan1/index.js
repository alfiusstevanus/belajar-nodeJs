const fs = require('fs') // core module
const coba = require('./coba') // local module ---> berbentuk objek
// const moment = require('moment') // third party module / npm module / akan ada di folder node_modules

console.log(coba.cetakNama('alfius'))
console.log(coba.PI)
console.log(coba.mahasiswa.cetakMhs())
new coba.Orang()