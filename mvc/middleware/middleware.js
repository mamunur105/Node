const express = require('express');
const session = require('express-session')
const flash = require('connect-flash');
const config = require('config')
const morgan = require('morgan');
const MongoDBStore = require('connect-mongodb-session')(session);
// Custom Middleware
const { bindUserWithRequest } = require('./authMiddleware')
const { setLocals } = require('./setLocals')

const MONGO_DB_URI = `mongodb+srv://${config.get("db-admin")}:${config.get("db-password")}@cluster0.kjaj7.mongodb.net/${config.get("db-name")}?retryWrites=true&w=majority`
const store = new MongoDBStore({
	uri: MONGO_DB_URI,
	collection: 'sessions',
	expires: 60 * 60 * 2 * 1000
});

const middleware = [
	morgan('dev'),
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
	flash(),
	bindUserWithRequest(),
	setLocals()
]


module.exports = app => {
	middleware.forEach ( mw => {
		app.use( mw )
	})
}