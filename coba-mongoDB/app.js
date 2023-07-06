const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
try {
    const db = client.db('belajar-mongo');
    const data = {
        nama: 'agus',
        email: 'agus@gmail.com'
    }
    //query menambahkan 1 data
    db.collection('nama').insertOne(
        data,
        (error,result) => {
            if(error){
                return console.log('gagal menambahkan data!')
            }
            console.log(result.ops)
        }
    )
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    }
}
run().catch(console.dir);