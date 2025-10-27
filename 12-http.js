const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.end('Welcome to our home page')
        
    }
    else if(req.url ==='/about'){
        res.end('Here is our short history')
        
    }
    else{
        res.end(`
            <h1>Oops!</h1>
            <p>The page is not found</p>
            <a href="/"> Back to the home page</a>
            `
        )
    }
})
server.listen(5000)