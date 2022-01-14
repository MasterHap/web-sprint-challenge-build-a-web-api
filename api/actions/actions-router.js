const express = require('express');
const Acts = require('./actions-model');
const {
    checkActId
} = require('./actions-middlware')
const router = express.Router();

router.get('/', (req, res) => {
    Acts.get()
    .then(actions => {
        res.json(actions);
    })
    .catch(err => {
        res.status(404).json({ 
            message:"Could not be retrieved",
            err: err.message,
            stack: err.stack,
      })
    })
})

router.get('/:id', checkActId, (req, res) => {
    res.json(req.act);
  })

// router.get('/:id', async (req, res) => {
//     const findActions = await Acts.get(req.params.id)
//         if(findActions){
//             res.json(findActions)
//         } else {
//             res.status(404).json({ message: "No project with given id" })
//         }
// })

module.exports = router;