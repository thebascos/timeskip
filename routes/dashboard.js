const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/', function (_req, res) {
  // get all customers
  Customer.find({}, function (err, customers) {
    if (err) {
      console.log(err);
    } else {
      res.render('dashboard', {
        customers: customers,
      });
    }
  });
});

router.get('/create-customer', function (_req, res) {
  res.render('dashboard/create-customer');
});

router.post('/customer', function (req, res) {
  // create customer
  const name = req.body.name;

  Customer.create({ name: name }, function (err, _customer) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/dashboard');
    }
  });
});

router.get('/edit-customer/:customerId', function (req, res) {
  const id = req.params.customerId;
  Customer.findOne({ _id: id }, function (err, customer) {
    if (err) {
      console.log(err);
    } else {
      res.render('dashboard/edit-customer', { customer: customer });
    }
  });
});

router.put('/customer/:customerId', function (req, res) {
  // edit customer
  const name = req.body.name;
  const id = req.params.customerId;

  Customer.updateOne({ _id: id }, { name: name }, function (err, _customer) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/dashboard');
    }
  });
});

router.delete('/customer/:customerId', function (req, res) {
  // delete customer
  Customer.deleteOne({ _id: req.params.customerId }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/dashboard');
    }
  });
});

module.exports = router;
