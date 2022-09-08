/*=================== MODULOS ===================*/
const express = require('express');
const morgan = require('morgan')
const { Server: Httpserver } = require('http')

/*=== Instancia de Server, contenedor y rutas ===*/
const app = express();
const httpServer = new Httpserver(app)
const routerProductos = require('./src/routes/productos.routes.js')
const routerCarritos = require('./src/routes/carritos.routes.js')

/*================= Middlewears =================*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static(__dirname + './public'))

/*==================== Rutas ====================*/
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);
app.use('*', (req, res) => {
    res.send({error: 'url no existe'})
})

/*================== Servidor ==================*/
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error}`))
