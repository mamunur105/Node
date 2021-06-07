const Contacts = require('../Model/Contact');

exports.getAllContacts = (req, res) => {
	Contacts.find()
		.then((contacts) => {
			res.render('index' , {contacts, error: {}});
		})
		.catch((e) => {
			console.log(e);
			res.status(500);
		});
};
exports.createContact = (req, res) => {
	let { name, phone, email, id } = req.body;
	let error = []
	if( !name ){
		error.name = "Please Provide your name"
	}
	if( !phone ){
		error.phone = "Please Provide your phone"
	}
	if( !email ){
		error.email = "Please Provide your Email"
	}

	let isError = Object.keys(error).length > 0 ;

	if( isError ){
		Contacts.find()
			.then((contacts) => {
				return res.render('index' , {contacts, error: error });
			})
			.catch((e) => {
				return res.status(500);
			});
	}
	if( id ){
		let { name, email, phone } = req.body;
		Contacts.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					name,
					email,
					phone
				}
			},
			{ new: true }
		)
			.then((re) => {
				Contacts.find()
					.then((contacts) => {
						return res.render('index' , {contacts, error: {}});
					})
					.catch((e) => {
						console.log(e);
						return	res.status(500);
					});
			})
			.catch((e) => {
				console.log(e);
				return res.status(500);
			});
	}else{
		let contact = new Contacts({
			name,
			email,
			phone
		});
		contact
			.save()
			.then((re) => {
				Contacts.find()
					.then((contacts) => {
						return res.render('index' , {contacts, error: error });
					})
					.catch((e) => {
						return res.status(500);
					});
			})
			.catch((e) => {
				return  res.status(500);
			});
	}

};

exports.getContactById = (req, res) => {
	let { id } = req.params;
	Contacts.findById(id)
		.then((re) => {
			res.json(re);
		})
		.catch((e) => {
			console.log(e);
			res.status(500);
		});
};

exports.updateContactById = (req, res) => {
	let { id } = req.params;
	let { name, email, phone } = req.body;
	Contacts.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				name,
				email,
				phone
			}
		},
		{ new: true }
	)
		.then((re) => {
			res.json(re);
		})
		.catch((e) => {
			console.log(e);
			res.status(500);
		});
};

exports.deleteContactById = (req, res) => {
	let { id } = req.params;
	Contacts.findOneAndDelete(
		{ _id: id }
	)
		.then((re) => {
			Contacts.find()
				.then((contacts) => {
					return res.render('index' , {contacts, error: {} });
				})
				.catch((e) => {
					return res.status(500);
				});
		})
		.catch((e) => {
			// console.log(e);
			return res.status(500);
		});
};
