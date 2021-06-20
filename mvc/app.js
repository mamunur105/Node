require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('config')
// Import MiddleWare
const app = express();
// Middleware
const setMiddleware = require('./middleware/middleware')
// Import Route
const setRoute = require('./routes/routes')

const MONGO_DB_URI = `mongodb+srv://${config.get("db-admin")}:${config.get("db-password")}@cluster0.kjaj7.mongodb.net/${config.get("db-name")}?retryWrites=true&w=majority`

const PORT = config.get("port") || 3000;
app.set( 'view engine', 'ejs')
app.set( 'views', 'views')

// Using Middleware
setMiddleware( app )
// Using Route 
setRoute( app )

mongoose.connect( MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
	console.log(chalk.green('Database Connected'))
	app.listen(PORT, () => {
		console.log( chalk.green(`Server Is running on port ${PORT}` ));
	});
})
.catch( err => {
	console.log(chalk.red( err ))
})

