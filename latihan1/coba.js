// console.log('coba.js')


function cetakNama(nama){
    return `halo nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
    nama : 'alfius',
    umur : '22',
    cetakMhs(){
        return `halo nama saya ${this.nama} dan saya ${this.umur} tahun`
    }
}


class Orang{
    constructor(){
        console.log('objek orang telah dibuat')
    }
}
//cara 1
// module.exports.cetakNama = cetakNama // biar bisa dipanggil di index.js
// module.exports.PI = PI 
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang //--> exports adalah objek 

//cara 2
    // module.exports = {
    //     cetakNama: cetakNama,
    //     PI: PI,
    //     mahasiswa : mahasiswa,
    //     Orang : Orang
    // }

    //cara 3 (pake ini)
    module.exports = {cetakNama, PI, mahasiswa, Orang}