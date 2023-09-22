const app = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://192.168.0.1138080']
    },
    maxHttpBufferSize: 2e8
});
var trazos = [];
var textos =[];
var respaldoTrazos = [];
var desactivado = false;
// Ajusta los siguientes parámetros según tus necesidades
var MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10 MB
var CLIENT_TIMEOUT = 60000; // 60 segundos
io.on('connection', (socket) => {

    socket.conn.setMaxContentSize=MAX_UPLOAD_SIZE;
    //Aqui es donde se recibe los datos del primer pizzaron
    console.log('Usuario con id: '+socket.id+' conectado');

    io.emit('TrazosServidor',trazos,desactivado);
    io.emit('TextosServidor',textos);

    socket.on('EnviarDibujo',(demo)=>{
        //console.log('Llego la imagen al servidor: '+demo);
        trazos.push(demo);
        
        io.emit('RecibirDibujo',demo);
    });

    socket.on('EnviarImagen',(demo)=>{
        try {
            //console.log('Llego la imagen al servidor: '+demo);
            io.emit('RecibirImagen',demo);
          } catch (error) {
            console.error('Error al procesar la imagen:', error);
          }
        
    });

    socket.on('Desactivar',(demo)=>{
        desactivado = demo;
        io.emit('RecibirDesactivar',demo);
    })

    socket.on('BorrarDibujo',(borrado)=>{
        respaldoTrazos = trazos;
        trazos = borrado;
        textos = borrado;
        //textos = [];
        io.emit('BorradoDibujo',trazos);
    });

    socket.on('EnviarTexto',(atributosTexto)=>{
        //console.log('Llego la imagen al servidor: '+demo);
        textos.push(atributosTexto);
        
        io.emit('RecibirTexto',atributosTexto);
    });
    
    //TODO SOCKET DESCONECTADO
    socket.on('disconnect', (reason) => {
        //30 segundos en dectectar que se desconecta el equipo
        let id = socket.id;
        console.log('Usuario con id: '+socket.id+' desconectado');

    });
});

http.listen(300, () => {
    console.log('Escuchando el puerto *:300');
});
