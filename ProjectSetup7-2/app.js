const express = require('express');
const morgan = require('morgan');
const app = express();
const contactRout = require('./router/contactroute');
const PORT = process.env.PORT || 8080;

app.use( morgan('dev') )
app.use( express.urlencoded( {extended: true} ) )
app.use( express.json() )

// User router start


app.use('/contacts', contactRout );

app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});
app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});
