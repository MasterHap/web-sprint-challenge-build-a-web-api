// add middlewares here related to actions
const Acts = require('./actions-model')

async function checkActId(req, res, next) {
    try {
        const possibleAct = await Acts.get(req.params.id)
        if (possibleAct) {
            req.act = possibleAct
            next()
        } else {
            next({ status: 404, message: `No Act ${req.params.id}` })
        }
    } catch (err) {
        next(err)
    }
}

function validateAct(req, res, next) {
    const {notes,description,completed,project_id} = req.body

    if (!notes, !description, completed === undefined, !project_id) {
      next({ status: 400, message: "Please provide missing info" })
    } else {
      next()
    }
  }

module.exports = { 
    checkActId, 
    validateAct
}