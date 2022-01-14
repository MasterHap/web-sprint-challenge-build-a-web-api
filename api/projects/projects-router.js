// Write your "projects" router here!
const express = require('express');
const Pro = require('./projects-model');
const { checkProId } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Pro.find(req.query)
    .then(p => {
        res.status(200).json(p);
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', checkProId, (req, res) => {
    res.json(req.pro)
})


module.exports = router;