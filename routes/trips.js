var express = require('express');
var router = express.Router();
const moment = require('moment')

const fetch = require('node-fetch');
const Trip = require('../models/trips');

/* GET all trips listing. */
router.get('/', (req, res) => {
	Trip.find().then(data => {
		res.json({ trips: data });
	});
});

/*
//data initialisation.
router.post('/init', (req, res) => {
	Trip.updateMany({},{selected: false, booked: false}).then(data => {
		res.json({ trips: data });
	});
});
*/

/* GET research trips listing. */
router.post('/search', (req, res) => {
	const start = moment(req.body.date).startOf('day')
	Trip.find({ departure: req.body.departure, arrival: req.body.arrival, date: { $gte: start.toDate(), $lte: moment(start).endOf('day').toDate() } }).then(data => {
		res.json({ trips: data });
	});
});

/* POST add trip to cart. */
router.post('/select', (req, res) => {
	Trip.updateOne({ departure: req.body.departure, arrival: req.body.arrival, date: req.body.date },{ selected: true }).then(data => {
		res.json({ result: true, data });
	});
});

/* POST remove trip from cart. */
router.post('/select/remove', (req, res) => {
	Trip.updateOne({ departure: req.body.departure, arrival: req.body.arrival, date: req.body.date, selected: true },{ selected: false }).then(data => {
		res.json({ result: true });
	});
});

/* Get selected trips listing. */
router.get('/select', (req, res) => {
	Trip.find({ selected: true, booked: false }).then(data => {
		res.json({ trips: data });
	});
});

/* POST book trips. */
router.post('/book', (req, res) => {
	Trip.updateMany({ selected: true, booked: false },{ booked: true }).then(data => {
		res.json({ result: true });
	});
});

/* GET booked trips listing. */
router.get('/book', (req, res) => {
	Trip.find({ booked: true }).then(data => {
		res.json({ trips: data });
	});
});

module.exports = router;
