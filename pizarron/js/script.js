var mouse;
var color = '#000000';
var tamaño=5;
var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var y = 150;
var x = 150;
var papel2;
var teclas = {
  MENOSTECLADO: 189,
  MASTECLADO: 187,
  MENOSNUMPAD: 109,
  MASNUMPAD: 107,
};

var trazo=[];

/*var tamaño1 = document.getElementById("tamaño1");
var tamaño2 = document.getElementById("tamaño2");
var tamaño3 = document.getElementById("tamaño3");

tamaño1.addEventListener("click", cambiarTamaño1);
tamaño2.addEventListener("click", cambiarTamaño2);
tamaño3.addEventListener("click", cambiarTamaño3);*/

cuadrito.addEventListener("mousedown", apretarMouse);
cuadrito.addEventListener("mouseup", soltarMouse);
cuadrito.addEventListener("mousemove", dibujarMouse);

cuadrito.addEventListener("touchstart", apretarTactil);
cuadrito.addEventListener("touchend", soltarTactil);
cuadrito.addEventListener("touchmove", dibujarTactil);

document.addEventListener("keydown", cambiarTamaño);


// FUNCIONES EXTRAS
function borrarTodo()
{
  tamaño=50;
  color="white";
}

function borrarLienzo(){
  papel.clearRect(0, 0, cuadrito.width, cuadrito.height);
}

// FUNCION PARA SELECTOR DE COLOR
var colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("change", cambiarColorPersonalizado);
function cambiarColorPersonalizado() {
  color = colorPicker.value;
  console.log('cambio')
} 

// FUNCION PARA CAMBIAR EL TAMAÑO DEL TRAZO
var tamanioSelect = document.getElementById("tamanioSelect");

for (var i = 5; i <= 15; i++) {
  var option = document.createElement("option");
  option.value = i;
  option.textContent = "Tamaño " + i;
  tamanioSelect.appendChild(option);
}

function cambiarTamanioPersonalizado() {
  var selectedValue = tamanioSelect.value;
  if (selectedValue !== "") {
    tamaño = parseInt(selectedValue);
  }
}
// Agregar el evento change al select para cambiar el tamaño
tamanioSelect.addEventListener("change", cambiarTamanioPersonalizado);



// FUNCION CON TODAS LAS PROPIEDADES PARA CREAR EL TRAZO
function dibujarLinea(colorD, xinicial, yinicial, xfinal, yfinal)
{
  console.log('dibujando huevoss');
  //color = papel.strokeStyle;
  papel.beginPath();
  papel.strokeStyle = colorD;
  papel.lineWidth= tamaño;
  papel.lineCap = "round";
  papel.moveTo(xinicial, yinicial);
  papel.lineTo(xfinal, yfinal);
  papel.stroke();
  papel.closePath;
  //papel.strokeStyle = color;
}

// FUNCIONES PARA MOUSE
function apretarMouse(evento) //INICIA EL TRAZO
{
  mouse = 1;
  trazo = [];
  dibujarLinea(color, x, y, x-0.1, y+0.1, papel);
  x = evento.layerX;
  y = evento.layerY;
  console.log('apreto');
}

function dibujarMouse(evento) // HACE EL TRAZADO
{
  if (mouse == 1)
    {
      trazo.push(
        {color:color,
          x:x,
          y:y,
          layerX:evento.layerX,
          layerY:evento.layerY,
          papel:papel
        });
      dibujarLinea(color, x, y, evento.layerX, evento.layerY, papel);
      console.log('lololol');

    }
    x = evento.layerX;
    y = evento.layerY;
}

function soltarMouse(evento) // TERMINA EL TRAZO
{
  mouse = 0;
  x = evento.layerX;
  y = evento.layerY;
  console.log('dejo de dibujar',papel);
  console.log(trazo);
  trazo.forEach(element=>{
      dibujarLinea(element.color, element.x, element.y, element.layerX, element.layerY, element.papel);

  });
  console.log('se soltó')
}


// FUNCIONES DE TOUCH
function apretarTactil(evento) // INICIA EL TRAZO
{
  console.log(evento.targetTouches[0].pageY);
  evento.preventDefault();
  tactil = 1;
  trazo = [];
  /*  
    x = evento.offsetX;
    y = evento.offsetY;
   */
  x = evento.targetTouches[0].pageX;
  y = evento.targetTouches[0].pageY;
}

function dibujarTactil(evento) // HACE EL TRAZO
{
  console.log(evento);
  if (tactil > 0)
    {
//      dibujarLinea(color, x-215, y-5, evento.targetTouches[0].pageX-215, evento.targetTouches[0].pageY-5, papel);
      trazo.push(
        {color:color,
          x:x-215,
          y:y-5,
          layerX:evento.targetTouches[0].pageX-215,
          layerY:evento.targetTouches[0].pageY-5,
          papel:papel
        });
      dibujarLinea(color, x-215, y-5, evento.targetTouches[0].pageX-215, evento.targetTouches[0].pageY-5, papel);

    }
    x = evento.targetTouches[0].pageX;
    y = evento.targetTouches[0].pageY;
    /*
    x = evento.offsetX;
    y = evento.offsetY;*/
}

function soltarTactil(evento) //TERMINA EL TRAZO
{
  var tactil= evento.touches [0];
  socket.emit('EnviarDibujo',trazo);
  x = evento.offsetX;
  y = evento.offsetY;
}


//FUNCIONES DE TAMAÑO
function cambiarTamaño1()
{
  tamaño=5;
}

function cambiarTamaño2()
{
  tamaño=10;
}

function cambiarTamaño3()
{
  tamaño=15;
}

function cambiarTamaño(evento)
{
  var cambio_tamaño = 2;
  switch(evento.keyCode)
    {
      case teclas.MENOSTECLADO:
      tamaño = tamaño - cambio_tamaño;
      break;

      case teclas.MENOSNUMPAD:
      tamaño = tamaño - cambio_tamaño;
      break;

      case teclas.MASTECLADO:
      tamaño = tamaño + cambio_tamaño;
      break;

      case teclas.MASNUMPAD:
      tamaño = tamaño + cambio_tamaño;
      break;
    }

    var ancho= document.getElementById("ancho").innerHTML= ("[" + tamaño + "]")
}



