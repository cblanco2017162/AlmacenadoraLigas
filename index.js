const mongoose = require('mongoose')
const usuarioController= require('./src/controllers/usuario.controller')
const app = require('./app')

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/LigaDeportiva', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Conexion a la base de datos exitosa')

    app.listen(3000, function () {
        usuarioController.creacionAdmin()
        console.log('Corriendo en el puerto 3000') 
    })
}).catch(err => console.log(err))