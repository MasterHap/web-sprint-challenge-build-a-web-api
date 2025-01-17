// add middlewares here related to projects
const Pro = require('./projects-model')

async function checkProId(req, res, next) {
    try {
        const possiblePro = await  Pro.get(req.params.id)
        if (possiblePro) {
            req.pro = possiblePro
            next()
        } else {
            next({ status: 404, message: `No Project ${req.params.id}` })
        }
    } catch (err) {
        next(err)
    }
}

function validatePro(req, res, next) {
    const {name,description,completed} = req.body

    if (!name,!description,completed === undefined) {
      next({ status: 400, message: "Please provide a name/description" })
    } else {
      next()
    }
  }

module.exports = { 
    checkProId,
    validatePro,
}