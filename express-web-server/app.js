const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname})
})

app.get('/product/:id', (req, res) => {
    res.send(`Product id: ${req.params.id} <br> Category: ${req.query.category}`)
})

//akan dijalankan apapun methodnya (menangani ketika tidak ada route)
app.use('/',(req,res) => {
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const http = require('http')
// const fs = require('fs')

// const renderHtml = (path, resp) => {
//     fs.readFile(path, (err,data) => {
//         if(err){
//             resp.writeHead(404)
//             resp.write('Error: file not found')
//         } else{
//             resp.write(data)
//         }
//     resp.end()
//     })
// }

// http
//     .createServer((req, resp) => {
//         resp.writeHead(200,{
//             'Content-Type': 'text/html'
//         })
//         const url = req.url

//         switch (url) {
//             case '/about':
//                 renderHtml('./about.html', resp)
//                 break;
//             case '/contact':
//                 renderHtml('./contact.html', resp)
//                 break;        
//             default:
//                 renderHtml('./index.html', resp)
//                 break;
//         }
//     })
//     .listen(3000, () => {
//         console.log('server is listening on server 3000!')
//     })