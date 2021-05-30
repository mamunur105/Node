const fs = require('fs');
const http = require('http');
const server = http.createServer( (req, res) => {
	console.log( req.url )
	fs.readFile('./index.html' , ( error, data ) => {
		if( error ){
			console.log( error );
		}else{
			res.write( data )
			res.end()
		}
	});
} )

server.listen(4141, () => {
	console.log( 'Server is running 4141');
})


