// bolinha
let xB = 300;
let yB = 200;
let diam = 20;
let raio = diam / 2;
let cor;

// velocidade
let speedX = 6;
let speedY = 6;
let rcomprimento = 10;
let raltura = 90;

// minha raquete
let xR = 5;
let yR = 150;

// raquete do oponente
let xRO = 585;
let yRO = 150;
let velocidadeYOponente;

let colidiu = false;

let chanceDeErrar = 0;
// placar
let pontosM = 0;
let pontosO = 0;

// sons
let raquetada;
let ponto;
let trilha;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  cor = color(
    random(0, 255, 255),
    random(0, 255, 255),
    random(0, 255, 255),
    random(50, 200)
  );
}

function draw() {
  background(0);
  bolinha();
  colisao();
  movimento();
  raquete(xR, yR);
  minharaquet();
  colisaoraquete(xR, yR);
  raquete(xRO, yRO);
  raqueteoponente();
  colisaoraquete(xRO, yRO);
  placar();
  pontos();
  linha();
  //bolinhaNaoFicaPresa();
}

function bolinha() {
  fill(cor);
  circle(xB, yB, diam);
  if (loop) {
    cor = color(
      random(0, 255, 255),
      random(0, 255, 255),
      random(0, 255, 255),
      random(50, 200)
    );
  }
}

function colisao() {
  if (xB + raio > width || xB - raio < 0) {
    speedX *= -1;
  }
  if (yB + raio > height || yB - raio < 0) {
    speedY *= -1;
  }
}

function movimento() {
  xB += speedX;
  yB += speedY;
}

function raquete(x, y) {
  fill(255);
  rect(x, y, rcomprimento, raltura);
}

function minharaquet() {
  if (keyIsDown(UP_ARROW)) {
    yR -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yR += 10;
  }
}

function colisaoraquete() {
  if (
    xB - raio < xR + rcomprimento &&
    yB - raio < yR + raltura &&
    yB + raio > yR
  ) {
    speedX *= -1;
  }
}

function colisaoraquete(x, y) {
  colidiu = collideRectCircle(x, y, rcomprimento, raltura, xB, yB, raio);
  if (colidiu) {
    speedX *= -1;
    +raquetada.play();
  }
}

function raqueteoponente() {
  if (keyIsDown(87)) {
    yRO -= 10;
  }
  if (keyIsDown(83)) {
    yRO += 10;
  }
  calculaChanceDeErrar()

  //  velocidadeYOponente = yB - yRO - rcomprimento / 2 - 50;
  //yRO += velocidadeYOponente;
}
function placar() {
  stroke(238);
  textAlign(CENTER);
  textSize(20);
  fill(color(138, 43, 226));
  rect(150, 10, 40, 20, 20);
  fill(255);
  text(pontosM, 170, 26);
  fill(color(138, 43, 226));
  rect(420, 10, 40, 20, 20);
  fill(255);
  text(pontosO, 440, 26);
}
function pontos() {
  if (xB > 590) {
    pontosM += 1;
    ponto.play();
  }
  if (xB < 10) {
    pontosO += 1;
    ponto.play();
  }
}
function preload() {
  trilha = loadSound("Juvi.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function linha() {
  stroke(cor);
  line(300, 1, 300, 400);
}
function calculaChanceDeErrar() {
  if (pontosO >= pontosM) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
