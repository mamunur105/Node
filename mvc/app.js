const express = require('express');
const morgan = require('morgan');
// getting-started.js
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.set( 'view engine', 'ejs')

app.use( morgan('dev') )
app.use( express.urlencoded( {extended: true} ) )
app.use( express.json() )


// User router start
app.get('/', (req, res) => {
		res.send('Home');
});
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});


app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});

