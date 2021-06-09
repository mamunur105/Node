const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;
app.set( 'view engine', 'ejs')
app.set( 'views', 'views')

const middleware = [
	 morgan('dev'),
	 express.static('public'),
	 express.urlencoded( {extended: true} ),
	 express.json()
]
app.use( middleware )

// User router start
app.get('/', (req, res) => {
	res.render('pages/auth/signup', { title: 'Create A New Account' });
});
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});


app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});

