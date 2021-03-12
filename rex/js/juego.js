/*como se se lee un teclado*/

document.addEventListener("keydown", function (evento) {
    // codigos teclado javascript el ejemplo 32,
    if (evento.code == 'Space' || evento.code == 'ArrowUp') {
       
        if (nivel.muerto == false)
            saltar();


        else {
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;

        }

    }
});

var imgRex;
var imgNube;
var imgCactus;
var imgSuelo;

function cargaImagenes() {

    imgRex = new Image(); //la variable se transforma en img.
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();


    imgRex.src = "img/rex.png";//le damos una imgen desc.
    imgNube.src = "img/nube.png";
    imgCactus.src = "img/cactus.png";
    imgSuelo.src = "img/piso2.png";
}



var ancho = 1000;
var alto = 300;
var canvas;
var ctx;

function inicializa() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d"); //el contexto como funciona la pantalla

    cargaImagenes();// cuando se cargue la pagina inicialiara el canvas y tambien las imgenes.
}// variable para dibujar en el canvas.


var suelo = 200;
var trex = {

    y: suelo,//poscion altura
    vy: 0,//velocidad para subir o bajar
    gravedad: 2,
    salto: 22,//altura del salto  pix
    vymax: 9,//velocidad que baja
    saltando: false
};

var nivel = { velocidad: 9, marcador: 0, muerto: false };
var cactus = {
    x: ancho + 100,//no se va a ver fuera del ancho del canvas
    y: suelo - 1
};// ancho : la anchura total del canvas +100 para que no se vea.
var nube = { x: 400, y: 100, velocidad: 1 };
var suelog = { x: 0, y: suelo + 70 };


function dibujaRex() {
    ctx.drawImage(imgRex, 0, -2, 62, 63, 100, trex.y, 80, 80);
}//le decimos el tam de img.
//63,63 tam img 100 100 posicion img 50 50 tam img establecido.


function dibujaCactus() {
    ctx.drawImage(imgCactus, 0, 0, 40, 62, cactus.x, cactus.y, 80, 80);
}

// movimmiento del cactus.
function logicaCactus() {
    if (cactus.x < -100) {
        cactus.x = ancho + 100;//que vuelva a la poscion normal
        nivel.marcador++;//vaya sumando el marcador
    }
    else {
        cactus.x -= nivel.velocidad;
    }
}

function dibujaSuelo() {
    ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 1400, 30);
}// cambiar el primer suelo

function logicaSuelo() {
    if (suelog.x > 200) {
        suelog.x = 0;
    }
    else {
        suelog.x += nivel.velocidad;
    }
}

function dibujaNube() {
    ctx.drawImage(imgNube, 0, 0, 55, 28, nube.x, nube.y, 80, 53);
   
}


function logicaNube() {
    if (nube.x < -100) {
        nube.x = ancho + 100;
    }
    else {
        nube.x -= nube.velocidad;
    }
    
}


// logica para el salto ;)-

function saltar() {
    trex.saltando = true;
    trex.vy = trex.salto; //le pongo el numero de la altura

}

function gravedad() {
    if (trex.saltando == true) {

        if (trex.y - trex.vy - trex.gravedad > suelo) {
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;//restamos velocidad

        }

    }
}

function colision() {
    //cactus.x
    //trex.y
    if (cactus.x >= 100 && cactus.x <= 150) {
        if (trex.y >= suelo - 25) {
            nivel.muerto = true;
            nivel.velocidad = 0;//para que se detenga.
            nube.velocidad = 0;
        }
    }
}

function puntuacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = "#566573";//color texto
    ctx.fillText(`${nivel.marcador}`, 900, 50);// donde

    if (nivel.muerto == true) {
        ctx.font = "60px impact";
        ctx.fillText("GAME OVER", 380, 150);
    }


}

function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}


/**La funcion principal reporcede las funciones en el canvas 10 por segundo */

function principal() {

    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();//llamamos a la funcion.
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex();
    puntuacion();



}

//---------- bucle principal. repite 10 por segundo siempre.

var FPS = 53;//fotogramas por segundo.

setInterval(function () {

    principal();
    
}, 1000 / FPS); // le decimos que haga esa funcion cada 1000/10;

