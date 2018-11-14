// Crear objeto principal. --Unidad 2, 5.5 modelo--
var Calculadora = {};

// Definicion de objeto Calculadora
Calculadora = (function () {
  // Variables privadas Calculadora
  var strResultado = "0",
      strPantalla = "0",
      strUltimoValor = "0",
      bolRealizaOpe = false,
      bolDigiteOperador = false,
      bolDigiteIgual = false,
      strOperador = "";

  // Metodos privados de Calculadora
  function NvoResultado() {
    //defino Variables para el resultado de la operacionS
    var ResOperacion = "" , Valor = "";

    //valido el valor que debo utilizar dependiendo de si la ejucucion la realizo el btn Igual (=)
    if (bolDigiteIgual == false) {
      Valor = strPantalla;
    } else {
      Valor = strUltimoValor;
    }

    //realizo Operacion
    if (bolRealizaOpe == true) {
      switch (strOperador) {
        case "+":
          ResOperacion = (parseFloat(strResultado) + parseFloat(Valor)).toString();
          break;
        case "-":
          ResOperacion = (parseFloat(strResultado) - parseFloat(Valor)).toString();
          break;
        case "*":
          ResOperacion = (parseFloat(strResultado) * parseFloat(Valor)).toString();
          break;
        default:
          ResOperacion = (parseFloat(strResultado) / parseFloat(Valor)).toString();
      }

    } else {
      ResOperacion = strPantalla;
    };

    if (bolDigiteIgual == false) {
      NvoPantalla("");
    } else {
      NvoPantalla(ResOperacion);
      bolRealizaOpe = false;
    }
    strResultado = ResOperacion;
    strPantalla = ResOperacion;
  }

  function NvoPantalla(NvoPantalla) {
    var display = document.getElementById('display');
    var subresultado = NvoPantalla.substring(0,8);

    display.innerHTML = subresultado;
  }

  // Public API
  return {
    concatena: function (numNumero) {
      //realizo Operacion
      if (strPantalla == "0" || bolDigiteOperador == true) {
        if (bolDigiteIgual == true) {
          strResultado = "0";
          strUltimoValor = "0";
          bolRealizaOpe = false;
        }
        bolDigiteOperador = false;
        strPantalla = numNumero;
        NvoPantalla(strPantalla);
        strUltimoValor = strPantalla;
      }
      else if (strPantalla.length <= 7) {
        bolDigiteOperador = false;
        strPantalla = strPantalla + numNumero;
        NvoPantalla(strPantalla);
        strUltimoValor = strPantalla;
      }
    },

    inicializa: function () {
      //realizo Operacion
      strResultado = "0";
      strPantalla = "0";
      strUltimoValor = "0";
      bolRealizaOpe = false;
      bolDigiteOperador = false;
      bolDigiteIgual = false;
      strOperador = "";

      NvoPantalla(strPantalla);
    },

    signo: function () {
      //defino Variables para el resultado de la operacionS
      var ResOperacion = "";

      //realizo Operacion
      ResOperacion = (parseFloat(strPantalla) * -1).toString();

      //actualizo la variable de resultado
      NvoPantalla(ResOperacion);

      strResultado = ResOperacion;
      strPantalla = ResOperacion;
    },

    punto: function () {
      //realizo Operacion
      if (strPantalla.indexOf(".") == -1 && bolDigiteOperador == false) {
        strPantalla = strPantalla + ".";
        NvoPantalla(strPantalla);
      }
    },

    suma: function () {
      if (bolDigiteOperador == false && bolRealizaOpe == true) {
          NvoResultado();
      };
      if (bolDigiteOperador == false && bolRealizaOpe == false) {
        strResultado = strPantalla;
      }
      strOperador = "+";
      bolDigiteOperador = true;
      bolRealizaOpe = true;
      bolDigiteIgual = false;
    },

    resta: function () {
      if (bolDigiteOperador == false && bolRealizaOpe == true) {
          NvoResultado();
      };
      if (bolDigiteOperador == false && bolRealizaOpe == false) {
        strResultado = strPantalla;
      }
      strOperador = "-";
      bolDigiteOperador = true;
      bolRealizaOpe = true;
      bolDigiteIgual = false;
    },

    multiplica: function () {
      if (bolDigiteOperador == false && bolRealizaOpe == true) {
          NvoResultado();
      };
      if (bolDigiteOperador == false && bolRealizaOpe == false) {
        strResultado = strPantalla;
      }
      strOperador = "*";
      bolDigiteOperador = true;
      bolRealizaOpe = true;
      bolDigiteIgual = false;
    },

    divide: function () {
      if (bolDigiteOperador == false && bolRealizaOpe == true) {
          NvoResultado();
      };
      if (bolDigiteOperador == false && bolRealizaOpe == false) {
        strResultado = strPantalla;
      }
      strOperador = "/";
      bolDigiteOperador = true;
      bolRealizaOpe = true;
      bolDigiteIgual = false;
    },

    total: function () {
      bolDigiteIgual = true;
      NvoResultado();
      bolDigiteOperador = true;
      bolRealizaOpe = true;
    },

    resultado: function () {
      return strResultado;
    }
  }
})();

//Funcion que reduce el tamaño de las teclas
function reduceTamaño(e) {
  document.getElementById(e).style="padding:2px 2px";
}
//Funcion que normaliza el tamaño de las teclas
function normalizaTamaño(e) {
  document.getElementById(e).style="padding:0px 0px";
}

//Seleccion de elementos "Tecla"
var elemento = document.querySelectorAll('.tecla')

//Recorro todos los elmentos para asignar su "listener del evento click"
for (var i = 0; i < elemento.length; i++) {
  var x = elemento[i]

  //Al "presionar" el click del mouse
  x.onmousedown = function(x) {
    var id = x.target.id
    reduceTamaño(id);
  };

  //listener del evento click de cada tecla.
  x.addEventListener('click', function(x) {
    var valor = x.target.id

    switch (valor) {
      case "on":
        Calculadora.inicializa();
        break;
      case "punto":
        Calculadora.punto();
        break;
      case "igual":
        Calculadora.total();
        break;
      case "mas":
        Calculadora.suma();
        break;
      case "menos":
        Calculadora.resta();
        break;
      case "por":
        Calculadora.multiplica();
        break;
      case "dividido":
        Calculadora.divide();
        break;
      case "sign":
        Calculadora.signo();
        break;
      case "raiz":
        //lo agrego unicamente para poder valorar solo las teclas numericas en el default
        break;
      default:
        Calculadora.concatena(valor);
        break;
    }

  });

  //Al "soltar" el click del mouse
  x.onmouseup = function(x) {
    var id = x.target.id
    normalizaTamaño(id);
  };
}


//Presionar en teclado
document.addEventListener('keydown', function(e) {
  var a = 48, b=96, t="0", v = e.which;

  switch (v) {
    // Enter
    case 13:
      Calculadora.total();
      break;

    // Escape
    case 27:
      Calculadora.inicializa();
      break;

    // punto de teclado numerico (numpad) y de teclado
    case 110: case 190:
      Calculadora.punto();
      break;

    // numeros de teclado
    case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57:
      t = (v - a).toString();
      Calculadora.concatena(t);
      break;
    // numeros de teclado numerico (numpad).
    case 96: case 97: case 98: case 99: case 100: case 101: case 102: case 103: case 104: case 105:
      t = (v - b).toString();
      Calculadora.concatena(t);
      break;

    // Mas (+)
    case 107:
      Calculadora.suma();
      break;

    // Resta (-)
    case 109:
      Calculadora.resta();
      break;

    // Multiplica (*)
    case 106:
      Calculadora.multiplica();
      break;

    // Multiplica (*)
    case 111:
      Calculadora.divide();
      break;
  }
});
