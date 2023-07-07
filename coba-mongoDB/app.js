const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);


//menambahkan 1 data
async function run() {
try {
    const db = client.db('belajar-mongo');
    const data = {
        nama: 'rahma',
        email: 'rahma@gmail.com'
    }
    //query menambahkan 1 data
    await db.collection('nama').insertOne(data)
    console.log('Data berhasil masuk ke DataBase!')
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    }
}
run();




db.collection('nama')