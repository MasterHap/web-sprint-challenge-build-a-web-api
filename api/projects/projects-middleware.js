// add middlewares here related to projects
const Pro = require('./projects-model')

async function checkProId(req, res, next) {
    try {
        const possiblePro = await  Pro.findById(req.params.id)
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

module.exports = { checkProId }