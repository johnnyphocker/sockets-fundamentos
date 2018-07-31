var socket = io();

socket.on('connect', function() {
	console.log('conectado');
});

socket.on('disconnect', function() {
	console.log('Perdimos la conexión');
});

socket.emit('enviarMensaje', {
	usuario: 'JP',
	mensaje: 'Hola mundo'
}, function() {
	console.log('Se disparó el callback');	
});

socket.on('enviarMensaje', function(mensaje, callback) {
	console.log('Servidor: ', mensaje);
	callback();
});