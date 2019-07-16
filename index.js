var cuadros = document.querySelectorAll(".container .row div");
var turno = 1;
var linea = document.querySelector("#linea");

var titulo = document.querySelector("h2");
var ganador = document.querySelector("h3");

var equis = '<i class="fas fa-times"></i>';
var circle = '<i class="far fa-circle"></i>';

var tablero = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var winner = null;

const reiniciar = () => {
  turno = 1;
  tablero = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  winner = null;
  cuadros.forEach(item => {
    item.innerHTML = "";
  });

  titulo.innerHTML = "Turno del jugador 1";
  ganador.innerHTML = "";
  linea.classList.remove(linea.classList.item(0));
};

const jugada = (x, y) => {
  if (tablero[x][y] == 0 && !winner) {
    tablero[x][y] = turno;
    cuadros[3 * x + y].innerHTML = turno == 1 ? equis : circle;
    var resultado = checkWinner();
    if (!resultado) {
      turno = turno == 1 ? 2 : 1;
      titulo.innerHTML = `Turno del jugador ${turno}`;
    } else if (resultado == "Empate") {
      ganador.innerHTML = `Empate`;
      winner = turno;
    } else {
      ganador.innerHTML = `Ganador: jugador ${turno}`;
      winner = turno;

      linea.classList.add(resultado);
    }
  }
};

const checkWinner = () => {
  // horizontal y vertical

  for (let i = 0; i < tablero.length; i++) {
    if (
      tablero[i][0] != 0 &&
      tablero[i][0] == tablero[i][1] &&
      tablero[i][1] == tablero[i][2]
    ) {
      return `horizontal${i}`;
    } else if (
      tablero[0][i] != 0 &&
      tablero[0][i] == tablero[1][i] &&
      tablero[1][i] == tablero[2][i]
    ) {
      return `vertical${i}`;
    }
  }

  // diagonales
  if (
    tablero[0][0] != 0 &&
    tablero[0][0] == tablero[1][1] &&
    tablero[1][1] == tablero[2][2]
  ) {
    return `diagonalDec`;
  } else if (
    tablero[2][0] != 0 &&
    tablero[2][0] == tablero[1][1] &&
    tablero[1][1] == tablero[0][2]
  ) {
    return `diagonalCrec`;
  } else {
    var lleno = true;
    tablero.forEach(row => {
      row.forEach(item => {
        if (item == 0) {
          lleno = false;
        }
      });
    });

    if (lleno) {
      return "Empate";
    }
  }

  return false;
};
