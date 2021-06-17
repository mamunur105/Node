const Flash = require('../utils/Flash')

exports.dashboardGetController = ( req, res, next) => {
	res.render('pages/dashboard/dashboard',
		{
			title: "Dashboard",
			flashMessage: Flash.getMessage( req )
		}
	)
}

// exports.dashboardPostController = ( req, res, next) => {
// 	res.render('pages/dashboard/dashboard', { title: "Dashboard" })
// }