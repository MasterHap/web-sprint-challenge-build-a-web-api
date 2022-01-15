const express = require('express');
const Acts = require('./actions-model');
const {
    checkActId,
    validateAct,
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

  router.post('/', validateAct, async(req, res, next) => {
    try{
        const newAction = await Acts.insert(req.body)
        res.json(newAction)
        console.log(newAction)
    }
    catch(err){
        next(err)
    }
})

router.delete('/:id', checkActId, (req, res, next) => {
    Acts.remove(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'The Action has been nuked' });
      })
      .catch(error => {
        next(error)
      });
  });
  
  router.put('/:id', validateAct, checkActId, (req, res, next) => {
    Acts.update(req.params.id, req.body)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        next(error)
      });
  });


module.exports = router;