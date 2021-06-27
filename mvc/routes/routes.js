// Import Route
const authRouter = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const playground = require('../playground/play')
const uploadsRoute = require('./uploadsRoute')
const routes = [
	{
		path: '/auth',
		handler: authRouter
	},
	{
		path: '/dashboard',
		handler: dashboardRoute
	},
	{
		path: '/uploads',
		handler: uploadsRoute
	},
	{
		path: '/playground',
		handler: playground
	},
	{
		path: '/',
		handler:  (req, res) => {
			res.json({
				message: "Hello World"
			})
		}
	}
]
module.exports = app => {
	routes.forEach ( r => {
		if( r.path === '/' || r.path === '*' ){
			app.get(r.path , r.handler)
		}else{
			app.use(r.path , r.handler)
		}
	})
}