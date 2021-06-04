const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;

app.set( 'view engine', 'ejs')

app.use( morgan('dev') )
app.use( express.urlencoded( {extended: true} ) )
app.use( express.json() )

// User router start
app.get('/', (req, res) => {
	let post = {
		title: "Lorem ipsum dolor sit amet.",
		subtitle: "Subtitle ase",
		desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic cupiditate iure voluptate fugit eaque quaerat aliquam officiis aliquid, ut, quidem distinctio. Iure aliquam optio quo debitis obcaecati quibusdam, aperiam consequatur."
	}
	res.render('index', post);
});
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>');
});
app.listen(PORT, () => {
	console.log(`Server Is running on port ${PORT}`);
});
