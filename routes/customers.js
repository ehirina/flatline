const express = require('express');
const customers = require("../services/customers")
const router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    const response = customers.getCustomers(req.query);
    res.json(response);
});

router.post('/', function (req, res, next) {
    const response = customers.createCustomer(req.body);
    res.json(response).status(201);
});

router.put('/:id', function (req, res, next) {
    const { id } = req.params;
    const response = customers.updateCustomer(id, req.body);

    if (!response) {
        return res.sendStatus(404);
    }

    res.json(response);
});

router.get('/:id', function (req, res, next) {
    const { id } = req.params;
    const response = customers.getCustomer(id);
    if (!response) {
        return res.sendStatus(404);
    }

    res.json(response);
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  const response = customers.deleteCustomer(id);

  if (!response) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});



module.exports = router;
