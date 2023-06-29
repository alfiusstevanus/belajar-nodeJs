import validator from 'validator'
// console.log(validator.isEmail('alfius@dasd.com')) apakah email?
// console.log(validator.isMobilePhone('087714470284','id-ID')) apakah no telp?
// console.log(validator.isNumeric('0812371332')) // apakah angka?

import chalk from 'chalk'

const nama = 'afliuss';
let pesan = chalk `lorem ipsum dolor {bgRed.black sit amet} consectur {bgGreen.black adipcising} elit. Nama saya ${nama}`;
console.log(pesan);