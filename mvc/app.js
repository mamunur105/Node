const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// Import Route 
const authRouter = require('./routes/authRoute')


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
app.use('/auth', authRouter );

app.get('/', (req, res) => {
	res.json({
		message: "Hello World"
	})
});
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});
// mongoose.connect('mongodb+srv://mamunur105:oR7uGhfndPj56cZS@cluster0.hlwdc.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
// .then( () => {
// 	app.listen(PORT, () => {
// 		console.log(`Server Is running on port ${PORT}`);
// 	});
// })
// .catch( err => {
// 	console.log( err )
// })

