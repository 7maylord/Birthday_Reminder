const joi = require('joi')

const addUserValidation = async (req, res, next) => {
    try {
        const bodyOfRequest = req.body;
        const addUserSchema = joi.object({
            email: joi.string().email().required(),
            username: joi.string().required(),
            dob: joi.date().iso().required()            
        })

        await addUserSchema.validateAsync(bodyOfRequest, { abortEarly: true })

        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    }
}


module.exports = {
    addUserValidation
}