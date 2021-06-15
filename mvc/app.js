const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
// Import Route 
const authRouter = require('./routes/authRoute')
// Playground Route
const app = express();

// Import MiddleWare 

const { bindUserWithRequest } = require('./middleware/authMiddleware')
const { setLocals } = require('./middleware/setLocals')


const MONGO_DB_URI = `mongodb+srv://mvcuser:oR7uGhfndPj56cZS@cluster0.kjaj7.mongodb.net/Cluster0?retryWrites=true&w=majority`
const store = new MongoDBStore({
	uri: MONGO_DB_URI,
	collection: 'sessions',
	expires: 60 * 60 * 2 * 1000
});


const PORT = process.env.PORT || 8080;
app.set( 'view engine', 'ejs')
app.set( 'views', 'views')

const middleware = [
	morgan('dev'),
	express.static('public'),
	express.urlencoded( {extended: true} ),
	express.json(),
	session({
		secret: process.env.SECRET_KEY || 'SECRET_KEY',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 2 * 1000
		},
		store: store
	}),
	bindUserWithRequest(),
	setLocals()
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

mongoose.connect( MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
	console.log('Database Connected')
	app.listen(PORT, () => {
		console.log(`Server Is running on port ${PORT}`);
	});
})
.catch( err => {
	console.log( err )
})

