// RULETA MONTECARLO

// VARIABLES
let tableroRuleta = document.querySelector(".numeros");
let tableroCompleto = document.querySelector(".tablero");
let divsValor = document.querySelectorAll(".valor");
let btnBorrarApuestas = document.querySelector(".borrar-apuestas");
let divSaldo = document.querySelector(".saldo");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 225; // Radio del círculo
let angle = Math.PI * Math.random() * 2; // Ángulo inicial en radianes
let velocidadAngular = 0; // Velocidad angular en rad/seg
const friccion = 0.00005; // Coeficiente de fricción en rad/seg
let anguloGrados = 0;
let numGanador = 0;
let valorSeleccionado = 1000;
const datos = [
  {
    numero: 0,
    rangoInicial: 0,
    rangoFinal: 9.72972973,
    color: "VERDE",
    tipo: "PAR",
    docena: "NO",
    mitad: "NO",
  },
  {
    numero: 32,
    rangoInicial: 9.72972973,
    rangoFinal: 19.45945946,
    color: "ROJO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 15,
    rangoInicial: 19.45945946,
    rangoFinal: 29.18918919,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "2a Docena",
    mitad: "1-18",
  },
  {
    numero: 19,
    rangoInicial: 29.18918919,
    rangoFinal: 38.91891892,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "2a Docena",
    mitad: "19-36",
  },
  {
    numero: 4,
    rangoInicial: 38.91891892,
    rangoFinal: 48.64864865,
    color: "NEGRO",
    tipo: "PAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 21,
    rangoInicial: 48.64864865,
    rangoFinal: 58.37837838,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "2a Docena",
    mitad: "19-36",
  },
  {
    numero: 2,
    rangoInicial: 58.37837838,
    rangoFinal: 68.10810811,
    color: "NEGRO",
    tipo: "PAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 25,
    rangoInicial: 68.10810811,
    rangoFinal: 77.83783784,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 17,
    rangoInicial: 77.83783784,
    rangoFinal: 87.56756757,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "2a Docena",
    mitad: "1-18",
  },
  {
    numero: 34,
    rangoInicial: 87.56756757,
    rangoFinal: 97.2972973,
    color: "ROJO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 6,
    rangoInicial: 97.2972973,
    rangoFinal: 107.027027,
    color: "NEGRO",
    tipo: "PAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 27,
    rangoInicial: 107.027027,
    rangoFinal: 116.7567568,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 13,
    rangoInicial: 116.7567568,
    rangoFinal: 126.4864865,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "2a Docena",
    mitad: "1-18",
  },
  {
    numero: 36,
    rangoInicial: 126.4864865,
    rangoFinal: 136.2162162,
    color: "ROJO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 11,
    rangoInicial: 136.2162162,
    rangoFinal: 145.9459459,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 30,
    rangoInicial: 145.9459459,
    rangoFinal: 155.6756757,
    color: "ROJO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 8,
    rangoInicial: 155.6756757,
    rangoFinal: 165.4054054,
    color: "NEGRO",
    tipo: "PAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 32,
    rangoInicial: 165.4054054,
    rangoFinal: 175.1351351,
    color: "ROJO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 10,
    rangoInicial: 175.1351351,
    rangoFinal: 184.8648649,
    color: "NEGRO",
    tipo: "PAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 5,
    rangoInicial: 184.8648649,
    rangoFinal: 194.5945946,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 24,
    rangoInicial: 194.5945946,
    rangoFinal: 204.3243243,
    color: "NEGRO",
    tipo: "PAR",
    docena: "2a Docena",
    mitad: "19-36",
  },
  {
    numero: 16,
    rangoInicial: 204.3243243,
    rangoFinal: 214.0540541,
    color: "ROJO",
    tipo: "PAR",
    docena: "2a Docena",
    mitad: "1-18",
  },
  {
    numero: 33,
    rangoInicial: 214.0540541,
    rangoFinal: 223.7837838,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 1,
    rangoInicial: 223.7837838,
    rangoFinal: 233.5135135,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 20,
    rangoInicial: 233.5135135,
    rangoFinal: 243.2432432,
    color: "NEGRO",
    tipo: "PAR",
    docena: "2a Docena",
    mitad: "19-36",
  },
  {
    numero: 14,
    rangoInicial: 243.2432432,
    rangoFinal: 252.972973,
    color: "ROJO",
    tipo: "PAR",
    docena: "2a Docena",
    mitad: "1-18",
  },
  {
    numero: 31,
    rangoInicial: 252.972973,
    rangoFinal: 262.7027027,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 9,
    rangoInicial: 262.7027027,
    rangoFinal: 272.4324324,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 22,
    rangoInicial: 272.4324324,
    rangoFinal: 282.1621622,
    color: "NEGRO",
    tipo: "PAR",
    docena: "2a Docena",
    mitad: "19-36",
  },
  {
    numero: 18,
    rangoInicial: 282.1621622,
    rangoFinal: 291.8918919,
    color: "ROJO",
    tipo: "PAR",
    docena: "2a Docena",
    mitad: "1-18",
  },
  {
    numero: 29,
    rangoInicial: 291.8918919,
    rangoFinal: 301.6216216,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 7,
    rangoInicial: 301.6216216,
    rangoFinal: 311.3513514,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 28,
    rangoInicial: 311.3513514,
    rangoFinal: 321.0810811,
    color: "NEGRO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 12,
    rangoInicial: 321.0810811,
    rangoFinal: 330.8108108,
    color: "ROJO",
    tipo: "PAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 35,
    rangoInicial: 330.8108108,
    rangoFinal: 340.5405405,
    color: "NEGRO",
    tipo: "IMPAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
  {
    numero: 3,
    rangoInicial: 340.5405405,
    rangoFinal: 350.2702703,
    color: "ROJO",
    tipo: "IMPAR",
    docena: "1a Docena",
    mitad: "1-18",
  },
  {
    numero: 26,
    rangoInicial: 350.2702703,
    rangoFinal: 360,
    color: "NEGRO",
    tipo: "PAR",
    docena: "3a Docena",
    mitad: "19-36",
  },
];
let apuestas = [];
let saldo = 10000;
if (divSaldo) {
  divSaldo.textContent = "SALDO: " + "$" + saldo;
}
let divsHistorial = document.querySelectorAll(".historial");
let numGanadorHistorial = [];
let tiempoGiro = 0;

const contadorInterval = setInterval(contador, 1000);
// FUNCIONES

function actualizarHistorial() {
  numGanadorHistorial.unshift(numGanador);
  for (
    let index = 0;
    index < Math.min(numGanadorHistorial.length, 10);
    index++
  ) {
    divsHistorial[index].textContent = numGanadorHistorial[index].numero;
    divsHistorial[index].classList = "col-1 historial";
    divsHistorial[index].classList.add(numGanadorHistorial[index].color);
  }
}

function obtenerNumero() {
  for (let index = 0; index < datos.length; index++) {
    let element = datos[index];
    if (
      element.rangoInicial <= anguloGrados &&
      element.rangoFinal >= anguloGrados
    )
      return element;
  }
}

function dubujarBola(x, y) {
  // Limpia el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Dibuja la ruleta
  let theWheel = new Winwheel({
    outerRadius: 240,
    innerRadius: 200,
    textFontSize: 20,
    textOrientation: "curved",
    textAlignment: "outer",
    rotationAngle: 90,
    lineWidth: 3,
    textFillStyle: "white",
    numSegments: 37,
    segments: [
      { fillStyle: "#308446", text: "0" },
      { fillStyle: "#FF0000", text: "32" },
      { fillStyle: "#0a0a0a", text: "15" },
      { fillStyle: "#FF0000", text: "19" },
      { fillStyle: "#0a0a0a", text: "4" },
      { fillStyle: "#FF0000", text: "21" },
      { fillStyle: "#0a0a0a", text: "2" },
      { fillStyle: "#FF0000", text: "25" },
      { fillStyle: "#0a0a0a", text: "17" },
      { fillStyle: "#FF0000", text: "34" },
      { fillStyle: "#0a0a0a", text: "6" },
      { fillStyle: "#FF0000", text: "27" },
      { fillStyle: "#0a0a0a", text: "13" },
      { fillStyle: "#FF0000", text: "36" },
      { fillStyle: "#0a0a0a", text: "11" },
      { fillStyle: "#FF0000", text: "30" },
      { fillStyle: "#0a0a0a", text: "8" },
      { fillStyle: "#FF0000", text: "32" },
      { fillStyle: "#0a0a0a", text: "10" },
      { fillStyle: "#FF0000", text: "5" },
      { fillStyle: "#0a0a0a", text: "24" },
      { fillStyle: "#FF0000", text: "16" },
      { fillStyle: "#0a0a0a", text: "33" },
      { fillStyle: "#FF0000", text: "1" },
      { fillStyle: "#0a0a0a", text: "20" },
      { fillStyle: "#FF0000", text: "14" },
      { fillStyle: "#0a0a0a", text: "31" },
      { fillStyle: "#FF0000", text: "9" },
      { fillStyle: "#0a0a0a", text: "22" },
      { fillStyle: "#FF0000", text: "18" },
      { fillStyle: "#0a0a0a", text: "29" },
      { fillStyle: "#FF0000", text: "7" },
      { fillStyle: "#0a0a0a", text: "28" },
      { fillStyle: "#FF0000", text: "12" },
      { fillStyle: "#0a0a0a", text: "35" },
      { fillStyle: "#FF0000", text: "3" },
      { fillStyle: "#0a0a0a", text: "26" },
    ],
  });

  // Dibuja la bola en las coordenadas (x, y)
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function Girar() {
  if (!tableroCompleto.classList.contains("disable")) {
    tableroCompleto.classList.remove("able");
    tableroCompleto.classList.add("disable");
  }
  // Calcula las coordenadas x e y en función del ángulo
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  // Dibuja la bola en el nuevo lugar
  dubujarBola(x, y);

  // Aplica fricción para desacelerar la bola
  velocidadAngular -= friccion;

  // Detén la animación cuando la velocidad angular sea muy baja
  if (velocidadAngular < 0.001) {
    velocidadAngular = 0;
    anguloGrados = (angle / Math.PI) * 180;
    numGanador = obtenerNumero();
    revisarApuestas(numGanador);
    actualizarHistorial();
    tableroCompleto.classList.remove("disable");
    tableroCompleto.classList.add("able");
  }

  // Incrementa el ángulo para la próxima posición
  if (angle <= 2 * Math.PI) {
    angle += velocidadAngular;
  } else {
    angle = 0;
  }

  // Solicita el próximo cuadro de animación
  if (velocidadAngular > 0) {
    requestAnimationFrame(Girar);
  }
}

function reset() {
  velocidadAngular = 0.01 + Math.random() * 0.04;
  angle = Math.PI * Math.random() * 2;
}

function revisarApuestas(numGanador) {
  for (let index = 0; index < apuestas.length; index++) {
    const apuesta = apuestas[index];
    // en caso de acertar el numero
    if (apuesta.numero == numGanador.numero) {
      saldo += apuesta.valor * 36;
    }
    // en caso de acertar el color
    if (apuesta.numero == numGanador.color) {
      saldo += apuesta.valor * 2;
    }
    // en caso de acertar a par o impar
    if (apuesta.numero == numGanador.tipo) {
      saldo += apuesta.valor * 2;
    }
    // en caso de acertar a la docena
    if (apuesta.numero == numGanador.docena) {
      saldo += apuesta.valor * 3;
    }
    // en caso de acertar a alto o bajo 1-18 19-36
    if (apuesta.numero == numGanador.mitad) {
      saldo += apuesta.valor * 2;
    }
  }
  divSaldo.textContent = "SALDO:" + "$" + saldo;
  apuestas = [];
  reinicarTablero();
}
function modificarApuesta(numero, valor) {
  apuestas.forEach((element) => {
    if (element.numero == numero) {
      element.valor += valor;
      element.valor;
    }
  });
}
function obtenerValorApuesta(numero) {
  for (let index = 0; index < apuestas.length; index++) {
    const element = apuestas[index];
    if (element.numero == numero) {
      return element.valor;
    }
  }
}

function reinicarTablero() {
  tableroRuleta.innerHTML = `                  <div class="col-1 slot" data-numero="0">0</div>
  <div class="col-11">
      <div class="container">
          <div class="row">
              <div class="col slot rojo" data-numero="3">3</div>
              <div class="col slot" data-numero="6">6</div>
              <div class="col slot rojo" data-numero="9">9</div>
              <div class="col slot rojo" data-numero="12">12</div>
              <div class="col slot" data-numero="15">15</div>
              <div class="col slot rojo" data-numero="18">18</div>
              <div class="col slot rojo" data-numero="21">21</div>
              <div class="col slot" data-numero="24">24</div>
              <div class="col slot rojo" data-numero="27">27</div>
              <div class="col slot rojo" data-numero="30">30</div>
              <div class="col slot" data-numero="33">33</div>
              <div class="col slot rojo" data-numero="36">36</div>
          </div>
          <div class="row">
              <div class="col slot" data-numero="2">2</div>
              <div class="col slot rojo" data-numero="5">5</div>
              <div class="col slot" data-numero="8">8</div>
              <div class="col slot" data-numero="11">11</div>
              <div class="col slot rojo" data-numero="14">14</div>
              <div class="col slot" data-numero="17">17</div>
              <div class="col slot" data-numero="20">20</div>
              <div class="col slot rojo" data-numero="23">23</div>
              <div class="col slot" data-numero="26">26</div>
              <div class="col slot" data-numero="29">29</div>
              <div class="col slot rojo" data-numero="32">32</div>
              <div class="col slot" data-numero="35">35</div>
          </div>
          <div class="row">
              <div class="col slot rojo" data-numero="1">1</div>
              <div class="col slot" data-numero="4">4</div>
              <div class="col slot rojo" data-numero="7">7</div>
              <div class="col slot" data-numero="10">10</div>
              <div class="col slot" data-numero="13">13</div>
              <div class="col slot rojo" data-numero="16">16</div>
              <div class="col slot rojo" data-numero="19">19</div>
              <div class="col slot" data-numero="22">22</div>
              <div class="col slot rojo" data-numero="25">25</div>
              <div class="col slot" data-numero="28">28</div>
              <div class="col slot" data-numero="31">31</div>
              <div class="col slot rojo" data-numero="34">34</div>
          </div>
          <div class="row">
              <div class="col slot" data-numero="1a Docena">1a Docena</div>
              <div class="col slot" data-numero="2a Docena">2a Docena</div>
              <div class="col slot" data-numero="3a Docena">3a Docena</div>
          </div>
          <div class="row">
              <div class="col slot" data-numero="1-18">1-18</div>
              <div class="col slot" data-numero="PAR">PAR</div>
              <div class="col slot rojo" data-numero="ROJO">ROJO</div>
              <div class="col slot" data-numero="NEGRO">NEGRO</div>
              <div class="col slot" data-numero="IMPAR">IMPAR</div>
              <div class="col slot" data-numero="19-36">19-36</div>
          </div>
      </div>
  </div>
`;
}
function contador() {
  if (tiempoGiro == 0) {
    tiempoGiro = 60;
    reset();
    Girar();
  }
  tiempoGiro -= 1;
  document.getElementById("tiempo").textContent = tiempoGiro;
}

// EVENT LISTENERS
window.onload = () => {
  dubujarBola();
};
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("valor") &&
    tableroCompleto.classList.contains("able")
  ) {
    if (parseFloat(e.target.dataset.valor) == -1) {
      valorSeleccionado = saldo;
    } else {
      valorSeleccionado = parseFloat(e.target.dataset.valor);
    }
    divsValor.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});

//agregar las apuestas
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("slot") &&
    saldo >= valorSeleccionado &&
    tableroCompleto.classList.contains("able")
  ) {
    if (e.target.classList.contains("apostado")) {
      modificarApuesta(e.target.dataset.numero, valorSeleccionado);
      let nuevoValor = obtenerValorApuesta(e.target.dataset.numero);
      e.target.querySelector(".div").innerHTML = `<div class="div">${
        "$" + nuevoValor
      }</div>`;
      saldo -= valorSeleccionado;
    } else {
      e.target.classList.add("apostado");
      e.target.innerHTML += `<div class="div">${"$" + valorSeleccionado}</div>`;
      apuestas.push({
        numero: e.target.dataset.numero,
        valor: valorSeleccionado,
      });
      saldo -= valorSeleccionado;
    }
    divSaldo.textContent = "SALDO: " + "$" + saldo;
  } else if (
    e.target.classList.contains("slot") &&
    saldo <= valorSeleccionado
  ) {
    alert("TC");
  }
});

// borrar apuestas
if (btnBorrarApuestas) {
  btnBorrarApuestas.addEventListener("click", () => {
    if (tableroCompleto.classList.contains("able")) {
      reinicarTablero();
      for (let index = 0; index < apuestas.length; index++) {
        const element = apuestas[index];
        saldo += element.valor;
      }
      divSaldo.textContent = "SALDO: " + "$" + saldo;
      apuestas = [];
    }
  });
}

// ------------------------------------------- MODELO NOMINA UPC

//VARIABLES
const Docentes = [
  {
    Nombre: "Adith",
    Apellido: "Perez",
    salario: 1160000,
    categoria: [{ tipo: "Auxiliar de tiempo completo", salario: 2.645 }],
    tiempo: "completo",
    posgrado: [
      { titulo: "Especializacion", bono: 0.1 },
      { titulo: "Maestria", bono: 0.45 },
      { titulo: "Doctorado", bono: 0.9 },
      { titulo: "Posdoctorado", bono: 0 },
    ],
    seminarios: [
      { grupo: "A1", bono: 0.56 },
      { grupo: "A", bono: 0.47 },
      { grupo: "B", bono: 0.42 },
      { grupo: "C", bono: 0.38 },
      { grupo: "Reconocido por Colciencias", bono: 0.33 },
      { grupo: "Semillero", bono: 0.19 },
    ],
    horas_trabajadas: 150,
    liquidacion: 0,
  },
  {
    Nombre: "Sofia",
    Apellido: "Ramirez",
    salario: 1160000,
    categoria: [{ tipo: "Auxiliar tiempo medio", salario: 1.509 }],
    tiempo: "medio",
    posgrado: [
      { titulo: "Especializacion", bono: 0.1 },
      { titulo: "Doctorado", bono: 0.9 },
    ],
    seminarios: [],
    horas_trabajadas: 80,
    liquidacion: 0,
  },
  {
    Nombre: "Margarita",
    Apellido: "Paez",
    salario: 1160000,
    categoria: [{ tipo: "Asistente de tiempo completo", salario: 3.125 }],
    tiempo: "completo",
    posgrado: [{ titulo: "Especializacion", bono: 0.1 }],
    seminarios: [{ grupo: "A1", bono: 0.56 }],
    horas_trabajadas: 160,
    liquidacion: 0,
  },
  {
    Nombre: "Kevin",
    Apellido: "Villalba",
    salario: 1160000,
    categoria: [{ tipo: "asistente de tiempo medio", salario: 1.749 }],
    tiempo: "medio",
    posgrado: [
      { titulo: "Especializacion", bono: 0.1 },
      { titulo: "Maestria", bono: 0.45 },
    ],
    seminarios: [{ grupo: "Semillero", bono: 0.19 }],
    horas_trabajadas: 80,
    liquidacion: 0,
  },
  {
    Nombre: "Marlon",
    Apellido: "Gomez",
    salario: 1160000,
    categoria: [{ tipo: "Asociado de tiempo completo", salario: 3.606 }],
    tiempo: "completo",
    posgrado: [
      { titulo: "Especializacion", bono: 0.1 },
      { titulo: "Maestria", bono: 0.45 },
      { titulo: "Doctorado", bono: 0.9 },
    ],
    seminarios: [
      { grupo: "A1", bono: 0.56 },
      { grupo: "Reconocido por Colciencias", bono: 0.33 },
    ],
    horas_trabajadas: 160,
    liquidacion: 0,
  },
  {
    Nombre: "Alejandro",
    Apellido: "Jimenez",
    salario: 1160000,
    categoria: [{ tipo: "Asociado de tiempo medio", salario: 1.99 }],
    tiempo: "medio",
    posgrado: [{ titulo: "Especializacion", bono: 0.1 }],
    seminarios: [],
    horas_trabajadas: 80,
    liquidacion: 0,
  },
  {
    Nombre: "Adith",
    Apellido: "Perez",
    salario: 1160000,
    categoria: [{ tipo: "Titular de tiempo completo", salario: 3.918 }],
    tiempo: "completo",
    posgrado: [
      { titulo: "Especializacion", bono: 0.1 },
      { titulo: "Maestria", bono: 0.45 },
    ],
    seminarios: [{ grupo: "Semillero", bono: 0.19 }],
    horas_trabajadas: 160,
    liquidacion: 0,
  },
  {
    Nombre: "Javier",
    Apellido: "Granados",
    salario: 1160000,
    categoria: [{ tipo: "AuxTitulariliar de tiempo medio", salario: 2.146 }],
    tiempo: "medio",
    posgrado: [],
    seminarios: [],
    horas_trabajadas: 60,
    liquidacion: 0,
  },
];

const tablaBody = document.getElementById("tabla-docentes-body");

//FUNCIONES
calcularSalario();

Docentes.forEach((docente) => {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${docente.Nombre}</td>
      <td>${docente.Apellido}</td>
      <td>${docente.salario}</td>
      <td>${docente.categoria[0].tipo}</td>
      <td>${docente.tiempo}</td>
      <td>${docente.posgrado.map((p) => `${p.titulo}`).join("<br>")}</td>
      <td>${docente.seminarios.map((s) => `${s.grupo}`).join("<br>")}</td>
      <td>${docente.horas_trabajadas}</td>
      <td>${docente.liquidacion.toFixed(2)}</td>
  `;
  tablaBody.appendChild(row);
});

function calcularSalario() {
  for (let index = 0; index < Docentes.length; index++) {
    const docente = Docentes[index];

    let maxPosgradoBono = 0;
    for (const posgrado of docente.posgrado) {
      if (posgrado.bono > maxPosgradoBono) {
        maxPosgradoBono = posgrado.bono;
      }
    }

    let seminariosBonoTotal = 0;
    for (const seminario of docente.seminarios) {
      seminariosBonoTotal += seminario.bono;
    }
    let maxHoras;
    if (docente.tiempo == "medio") {
      maxHoras = 80;
    } else {
      maxHoras = 160;
    }

    docente.liquidacion =
      (((docente.categoria[0].salario + seminariosBonoTotal + maxPosgradoBono) *
        docente.salario) /
        maxHoras) *
      docente.horas_trabajadas;
  }
}

//LISTENERS
