const http = require('http');
const server = http.createServer( (req, res) => {
	console.log( req.url )
	res.end('<h1>Something</h1>')
} )

server.listen(4141, () => {
	console.log( 'Server is running 4141');
})



	


