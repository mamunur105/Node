const express = require('express');
const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;

function customMiddleware(req, res, next){
	if( '/blocked' === req.url ){
		res.send(` ${req.url} page is blocked by admin`)
	}
	next()
}
app.use( customMiddleware )
// app.use( morgan('dev') ) // Global route Middleware 
// Route
app.get('/about', morgan('dev'), (req, res) => {
	res.send('Welcome to about page!');
});
app.get('/blocked', morgan('dev'), (req, res) => {
	res.send('Welcome to Help page!');
});
app.get('/json', (req, res) => {
	res.json({
		message: 'I am response'
	});
});
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});
app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});
