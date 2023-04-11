const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firsName: String,
	lastName: String,
	email: Date,
	selected: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
	booked: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
});

const User = mongoose.model('users', userSchema);

module.exports = User;