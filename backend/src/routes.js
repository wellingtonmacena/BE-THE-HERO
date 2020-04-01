const express = require('express')
const routes = express.Router()

const {celebrate, Segments, Joi} = require('celebrate')

const OngController = require('./controllers/OngController')
const CasesController = require('./controllers/CasesController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), ProfileController.index)


routes.post('/login', SessionController.create)


routes.get("/cases", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CasesController.index)


routes.post("/cases",celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),  celebrate({
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required().min(5),
        descricao: Joi.string().required(),
        valor: Joi.number().required()
    })
}), CasesController.create)


routes.delete('/cases/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CasesController.delete)


module.exports = routes
