const express = require('express')
const routes = express.Router()

const OngController = require('./controllers/OngController')
const CasesController = require('./controllers/CasesController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.post('/login', SessionController.create)

routes.get("/cases", CasesController.index)
routes.post("/cases", CasesController.create)
routes.delete('/cases/:id', CasesController.delete)


module.exports = routes
