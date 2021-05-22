const express = require('express')
const app = express();
var port = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Rotas = require('./rotas/router')
app.use('/api', Rotas)

app.listen(port,() =>{
    console.log("Servidor rodando")
})

