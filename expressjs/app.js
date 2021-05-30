const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080


// Route 
app.get('/about', (req, res) => {
	res.send('Welcome to about page!')
})









app.get('/', (req, res) => {
	res.send('Hello World!')
})
app.get('*', (req, res) => {
	res.send('<h1>404 Not Found</h1>')
})
app.listen(PORT , () => {
	console.log(`Server Is running on port ${PORT}`)
})
