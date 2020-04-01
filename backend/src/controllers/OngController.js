const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async create(request, response){
    const {nome, email, whatsapp, cidade, uf} = request.body

    const id = generateUniqueId()
   
    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade,
        uf
    })

    return response.json({id})

    },

    async index(request, response){
        const ongs = await connection('ongs').select('*')

        return response.json(ongs)
    }

}