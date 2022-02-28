const joi = require('joi')


const validateBookPost = joi.object({

    title: joi.string().required(),
    isbn: joi.string().max(10).required(),
    pages: joi.number().required(),
    year: joi.number().required(),
    author_id: joi.string().required(),
    publisher_id: joi.string().required(),

})


module.exports = { validateBookPost }