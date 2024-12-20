const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Datos iniciales (puede conectarse a una base de datos en lugar de esto)
let products = [];

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Enviar productos actuales al nuevo cliente
    socket.emit('updateProducts', products);

    // Escuchar eventos para agregar un producto
    socket.on('addProduct', (product) => {
        products.push(product);
        io.emit('updateProducts', products);
    });

    // Escuchar eventos para eliminar un producto
    socket.on('deleteProduct', (productId) => {
        products = products.filter(p => p.id !== productId);
        io.emit('updateProducts', products);
    });
});

// Rutas
const viewsRouter = require('./routers/views.router');
app.use('/', viewsRouter);

// Iniciar el servidor
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:8080`);
});



// PERDONEN QUERIDO PROFESOR O QUERIDOS TURORES QUE VAYAN A CORREGIR EL PROYECTO, LAS LINEAS DE COMENTARIOS LAS DEJO PARA GUIARME Y NO PERDERME CON EL CODIGO, PROMETO CUANDO SEAN LAS UTLTIMAS ENTREGAS O EL PROYECTO FINAL SACARLAS, DESDE YA MUCHAS GRACIAS!!!!  