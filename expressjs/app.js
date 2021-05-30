const express = require('express');
const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
app.use( morgan('dev') )
// Route

app.get('/about', (req, res) => {
	res.send('Welcome to about page!');
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
