const express = require('express')
const app = express()
const routes = require("./routes")
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(routes)




app.listen(4001, function(req, res){
    console.log("servidor conectado na porta 4001")
})