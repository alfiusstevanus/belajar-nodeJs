const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// menampilkan 1 data
// async function run() {
// try {
//     const database = client.db("belajar-mongo");
//     const mahasiswa = database.collection("mahasiswa");

//     // Query for a movie that has the name 'alfius'
//     const query = { nama: "alfius" };

//     // const options = {
//     //   // sort matched documents in descending order by rating
//     // sort: { "imdb.rating": -1 },
//     //   // Include only the `title` and `imdb` fields in the returned document
//     // projection: { _id: 0, title: 1, imdb: 1 },
//     // };
//     const mahaiswa = await mahasiswa.findOne(query);
//     // since this method returns the matched document, not a cursor, print it directly
//     console.log(mahaiswa);
//     } finally {
//     await client.close();
//     }
// }
// run().catch(console.dir);


// menampilkan banyak data 
// async function run() {
// try {
//     const database = client.db("belajar-mongo");
//     const mahasiswa = database.collection("mahasiswa");

    // query for mahasiswa that have a runtime less than 15 minutes
    // const query = { nama: 'alfius'}

    // const options = {
    //   // sort returned documents in ascending order by title (A->Z)
    // sort: { title: 1 },
    //   // Include only the `title` and `imdb` fields in each returned document
    // projection: { _id: 0, title: 1, imdb: 1 },
    // };

//     const cursor = mahasiswa.find(query);

//     // print a message if no documents were found
//     if ((await mahasiswa.countDocuments(query)) === 0) {
//     console.log("Data tidak ditemukan!");
//     }

//     for await (const doc of cursor) {
//     console.dir(doc);
//     }

//     } finally {
//     await client.close();
//     }
// }
// run().catch(console.dir);





// menambahkan 1 data
// async function run() {
// try {
//     const database = client.db("belajar-mongo");
//     const mahasiswa = database.collection("mahasiswa");
//     // create a document to insert
//     const data = {
//     nama: "alfius",
//     email: "alfius@gmail.com",
//     }



//     const result = await mahasiswa.insertOne(data);

//     console.log(`Data berhasil ditambahkan kedatabase dengan ID: ${result.insertedId}`);
// } finally {
//     await client.close();
// }
// }
// run().catch(console.dir);


// menambahkan banyak data
// async function run() {
//     try {
//         const database = client.db("belajar-mongo");
//         const mahasiswa = database.collection("mahasiswa");
//         // create a document to insert
//         const datas = [
//         {
//             nama: "alfius",
//             email: "alfius@gmail.com",
//         },
//         {
//             nama: "tumpal",
//             email: "tumpal@gmail.com",
//         }
//     ]
//         // const options = { ordered: true };
//         const result = await mahasiswa.insertMany(datas);
    
//         console.log(`${result.insertedCount} Data berhasil ditambahkan ke database.`);
//     } finally {
//         await client.close();
//     }
//     }
//     run().catch(console.dir);



// update data
// async function run() {
// try {
//     const database = client.db("belajar-mongo");
//     const mahasiswa = database.collection("mahasiswa");

//     // create a filter for a movie to update
//     const filter = { nama: "stevanus" };

//     // this option instructs the method to create a document if no documents match the filter
//     // const options = { upsert: true };

//     // create a document that sets the plot of the movie
//     const updateDoc = {
//     $set: {
//         email: `stevanus@school.ac.id`
//     },
// };
//     const result = await mahasiswa.updateOne(filter, updateDoc); //kalo mau langsung banyak pake updateMany()
//     console.log(
//         `${result.matchedCount} data didapat, berhasil update ${result.modifiedCount} data`,
//     );
//     } finally {
//     await client.close();
//     }
// }
// run().catch(console.dir);


// menghapus sebuah data
async function run() {
try {
    const database = client.db("belajar-mongo");
    const mahasiswa = database.collection("mahasiswa");

    const query = { nama: "alfius" };

    const result = await mahasiswa.deleteOne(query); //deleteMany() jika ingin banyak data yang dihapus
    if (result.deletedCount === 1) {
    console.log(`Data tersebut berhasil dihapus`);
    } else {
    console.log("Gagal! Tidak ada data yang berhasil dihapus!");
    }
    } finally {
    await client.close();
    }
}
run().catch(console.dir);