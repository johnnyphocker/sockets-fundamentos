const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer()

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

let io = socketIO(server);
io.on('connection', (client) => {

	console.log('cliente conectado');

	client.emit('enviarMensaje', {
		usuario: 'Admin',
		mensaje: 'Bienvenido a esta aplicación'
	});

	client.on('disconnect',() => {
		console.log('usuario desconectado');
	});

	client.on('enviarMensaje', (mensaje, callback) => {
		//console.log(mensaje);
		if(mensaje.usuario) {
			callback({
				resp: 'Todo salió bien'
			});
		} else {
			callback({
				resp: 'Falló'
			});
		}
	});

});



server.listen(port, (err) => {

    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);

});