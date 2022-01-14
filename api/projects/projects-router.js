// Write your "projects" router here!
const express = require('express');
const Pro = require('./projects-model');
const {
    checkProId
} = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Pro.get()
    .then(p => {
        res.json(p);
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', checkProId, (req, res) => {
    res.json(req.pro)
})

// router.get('/:id', async (req, res, next) => {
//     const findProject = await Pro.get(req.params.id)
//         if(findProject){
//             res.json(findProject)
//         } else {
//             next()
//         }
// })


module.exports = router;