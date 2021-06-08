const express = require('express');
const morgan = require('morgan');
// getting-started.js
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

// app.set( 'view engine', 'ejs')

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


// mongoose.connect('mongodb+srv://mamunur105:oR7uGhfndPj56cZS@cluster0.hlwdc.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
// .then( () => {
	app.listen(PORT, () => {
		console.log(`Server Is running on port ${PORT}`);
	});

// })
// .catch( err => {
// 	console.log( err )
// })

