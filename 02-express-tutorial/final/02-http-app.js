const http = require('http');
const { readFileSync } = require('fs')
//get all fils
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeLogic = readFileSync('./navbar-app/browser-app.js')
const homeIcon = readFileSync('./navbar-app/logo.svg')
const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(url)
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(homePage)
    } else if (url == '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' })
        res.write(homeStyles)
    } else if (url == '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' })
        res.write(homeLogic)
    } else if (url == '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' })
        res.write(homeIcon)
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Page not found</h1>')
    }
    res.end()
})

server.listen(5000)
