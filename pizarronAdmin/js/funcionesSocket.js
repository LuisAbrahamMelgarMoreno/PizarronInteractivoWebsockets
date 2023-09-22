var socket = io('http://192.168.100.112:300');

function inicioWebSocket(){
    let colorAnterior
    socket.on("connect", () => {
      console.log("----------------------------------Conexion DESDE AL SERVIDOR--------------------------------");
      socket.on('RecibirDibujo',(puntos)=>{
          colorAnterior = color;
          //console.log(color);
          console.log("Recibi la imagen",puntos);
          puntos.forEach(punto=>{
            dibujarLinea(punto.color, punto.x, punto.y, punto.layerX, punto.layerY, this.papel);
  
          });
          color = colorAnterior;
          console.log(color);
          //this.backgroundImage =demo;
          // await this.$refs.VueCanvasDrawing.redraw();
      });
  
      /*
      this.socket.on('RecibirDesactivar',(demo)=>{
          let disabled = demo;
          console.log('RECIBI BLOQUEO')
      });
      */
  
  });
  }