const express = require('express');
const morgan = require('morgan');
const userRouter = require('./router/userrouter');
const postRouter = require('./router/postrouter');
const app = express();
app.use( morgan('dev') )
const PORT = process.env.PORT || 8080;
// User router start

// User router end
app.use( '/user', userRouter );
app.use( '/post', postRouter );
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});
app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});
