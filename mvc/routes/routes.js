// Import Route
const authRouter = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
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
		path: '/',
		handler:  (req, res) => {
			res.json({
				message: "Hello World"
			})
		}
	},
	{
		path: '*',
		handler:  (req, res) => {
			res.render('error/404', {
				title: "404 Not Found",
				flashMessage: {}
			});
		}
	}
]
module.exports = app => {
	routes.forEach ( r => {
		if( r.path === '/' ){
			app.get(r.path , r.handler)
		}else{
			app.use(r.path , r.handler)
		}
	})
}