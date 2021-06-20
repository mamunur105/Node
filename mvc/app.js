require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
// Import Route
const authRouter = require('./routes/authRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const config = require('config')
// Playground Route
// const PlaygroundRoute = require('./playground/validator')

const app = express();
// Import MiddleWare
const morgan = require('morgan');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const { bindUserWithRequest } = require('./middleware/authMiddleware')
const { setLocals } = require('./middleware/setLocals')

// console.log( config.get("db-name") )

const MONGO_DB_URI = `mongodb+srv://${config.get("db-admin")}:${config.get("db-password")}@cluster0.kjaj7.mongodb.net/${config.get("db-name")}?retryWrites=true&w=majority`
const store = new MongoDBStore({
	uri: MONGO_DB_URI,
	collection: 'sessions',
	expires: 60 * 60 * 2 * 1000
});

const PORT = config.get("port") || 3000;
app.set( 'view engine', 'ejs')
app.set( 'views', 'views')
if( app.get('env').toLowerCase().trim() === 'development' ){
	app.use( morgan('dev') )
}
// console.log( app.get('env').toLowerCase().toString() )
const middleware = [
	express.static('public'),
	express.urlencoded( {extended: true} ),
	express.json(),
	session({
		secret: config.get("secret"),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 2 * 1000
		},
		store: store
	}),
	bindUserWithRequest(),
	setLocals(),
	flash()
]
app.use( middleware )

// User router start
app.use('/auth', authRouter );
app.use('/dashboard', dashboardRoute );
// app.use('/playground', PlaygroundRoute );

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

