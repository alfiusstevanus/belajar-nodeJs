const http = require('http')
const fs = require('fs')

const renderHtml = (path, resp) => {
    fs.readFile(path, (err,data) => {
        if(err){
            resp.writeHead(404)
            resp.write('Error: file not found')
        } else{
            resp.write(data)
        }
    resp.end()
    })
}

http
    .createServer((req, resp) => {
        resp.writeHead(200,{
            'Content-Type': 'text/html'
        })
        const url = req.url

        switch (url) {
            case '/about':
                renderHtml('./about.html', resp)
                break;
            case '/contact':
                renderHtml('./contact.html', resp)
                break;        
            default:
                renderHtml('./index.html', resp)
                break;
        }
    })
    .listen(3000, () => {
        console.log('server is listening on server 3000!')
    })