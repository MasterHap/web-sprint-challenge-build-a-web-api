// Write your "projects" router here!
const express = require('express');
const Pro = require('./projects-model');
const {
    checkProId,
    validatePro,
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

router.post('/', validatePro, (req, res, next) => {
    Pro.insert(req.body)
    .then(pro => {
        res.status(201).json(pro)
    })
    .catch(err => {
        next(err)
    })
})

router.delete('/:id', checkProId, (req, res, next) => {
    Pro.remove(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'The Project has been nuked' });
      })
      .catch(error => {
        next(error)
      });
  });
  
  router.put('/:id', validatePro, checkProId, (req, res, next) => {
    Pro.update(req.params.id, req.body)
      .then(pro => {
        res.status(200).json(pro);
      })
      .catch(error => {
        next(error)
      });
  });

module.exports = router;