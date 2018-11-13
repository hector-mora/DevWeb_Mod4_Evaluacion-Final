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
      //bolRealizaOpe = true;
    };

    if (bolDigiteIgual == false) {
      NvoPantalla(strPantalla);
    } else {
      NvoPantalla(ResOperacion);
      //bolDigiteIgual = false;
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

function cambiotamaño(e) {
  document.getElementById(e).style="padding:5px 5px";
  document.getElementById(e).style="padding:0px 0px";
}
//metodo comun
var elemento = document.querySelectorAll('.tecla')

for (var i = 0; i < elemento.length; i++) {
  var x = elemento[i]

  x.addEventListener('click', function(x) {
    var valor = x.target.id
    switch (valor) {
      case "on":
        cambiotamaño(valor);
        Calculadora.inicializa();
        break;
      case "punto":
        cambiotamaño(valor);
        Calculadora.punto();
        break;
      case "igual":
        cambiotamaño(valor);
        Calculadora.total();
        break;
      case "mas":
        cambiotamaño(valor);
        Calculadora.suma();
        break;
      case "menos":
        cambiotamaño(valor);
        Calculadora.resta();
        break;
      case "por":
        cambiotamaño(valor);
        Calculadora.multiplica();
        break;
      case "dividido":
        cambiotamaño(valor);
        Calculadora.divide();
        break;
      case "sign":
        cambiotamaño(valor);
        Calculadora.signo();
        break;
      case "raiz":
        cambiotamaño(valor);
        break;
      default:
        cambiotamaño(valor);
        Calculadora.concatena(valor);
        break;
    }
  });
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
