const Contacts = require('../Model/Contact');

exports.getAllContacts = (req, res) => {
	Contacts.find()
		.then((re) => {
			res.json(re);
		})
		.catch((e) => {
			console.log(e);
			res.status(500);
		});
};
exports.createContact = (req, res) => {
	let { name, phone, email } = req.body;
	let contact = new Contacts({
		name,
		email,
		phone
	});
	contact
		.save()
		.then((re) => {
			res.json(re);
		})
		.catch((e) => {
			console.log(e);
			res.status(500);
		});
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
			res.json(re);
		})
		.catch((e) => {
			console.log(e);
			res.status(500);
		});
};
