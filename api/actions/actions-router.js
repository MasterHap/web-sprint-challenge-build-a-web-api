// Write your "actions" router here!
const express = require('express');
const Acts = require('./actions-model');
const { checkActId } = require('./actions-middlware');

const router = express.Router();

router.get('/api/actions', (req, res, next) => {
    Acts.find(req.query)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        next(err)
    })
})

router.get('/api/actions:id', checkActId, (req, res) => {
    res.json(req.act)
})

module.exports = router;