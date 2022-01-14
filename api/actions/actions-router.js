// Write your "actions" router here!
const express = require('express');
const Acts = require('./actions-model');
const { checkActId } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Acts.get(req.query)
    .then(acts => {
        res.status(200).json(acts);
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', checkActId, (req, res) => {
    res.json(req.act)
})

module.exports = router;