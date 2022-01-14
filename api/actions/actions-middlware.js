// add middlewares here related to actions
const Acts = require('./actions-model')

async function checkActId(req, res, next) {
    try {
        const possibleAct = await Acts.findById(req.params.id)
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

module.exports = { checkActId }