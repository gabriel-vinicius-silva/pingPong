/**
 * @author raqueteOponenteColidio Vinicius Da Silva
 * O programa retrata um clássico jogo retro conhecido como Pong.
 * O projeto visa ampliar os meus conhecimentos sobre o JavaScript.
 */

// Movimentos da bola e diâmetros
//raquete quando  tever muita DEFESA se usa :
let raqueteBateuSemPontuar = 0;

let xBola = 300; // X = altura
let yBola = 200; // Y = movimentos laterais
let diametro = 15;
let velocidadeXBola = 5;
let velocidadeYBola = 5;
let raio = diametro / 2;
let xRaquete = 5;
let yRaquete =150;
let comprimentoDaRaquete = 10;
let comprientoRaqueteOponente = 10;
let alturaDaRaquete = 90;
let xRaqueteOponente  = 589;
let alturaDaRaqueteOponente = 90;
let yRaqueteOponente = 150;
let raqueteOponenteColidio = false;


// sons
let raquete;
let Marcarponto;
let trilha;
let tocarSom = false;

function preload() { // funçoes para tocar musica. 
    if(tocarSom){
		fundo  = loadSound("fundoPiano.mp3");
		Marcarponto = loadSound("marcarPonto.mp3");
		raquetada = loadSound("raquetada.mp3");
		comemoracao = loadSound ("comemoraçao.wav")
	}
}

//contador de pontos
let meusPontos = 0 ;
let pontosDoOponente = 0 ;  

function setup() {
  createCanvas(600, 400);
  if(tocarSom){
	fundo.loop();
  }
}

//onde se armazenam funções,para ficarem de   forma mais organizada.
function draw() {  
  background(0);
  //função que fas a bola aparecer
  mostrarABola(); 
  // função que determina os movimentos da bola  
  movimentacaoBola(); 
  colisaoBorda(); // função quu determina as colizões da borda 
  mostrarARaquete(); //  função que mostra a movimentação raquete
  verificarColisaoRaquete(); //função que mostrAmovimentaçãoraquete
  mostrarARaqueteOponente ();
  movimentacaoDaRaquete();
  movimentaRaqueteOponente();
  verificarColisaoRaqueteOponete();
  incluiPlacar();
  marcaPonto ();
  verificarAlmentoDeVelocidade();
}

// Função para exibir a bola do pong
function mostrarABola() {
  circle(xBola, yBola, diametro);
}

// Função das movimentações da bola
function movimentacaoBola() {
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

        // Função de colisão com as bordas
function colisaoBorda() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadeXBola *= -1;
	if(tocarSom){
		Marcarponto.play();
	}
  }

  if (yBola + raio > height || yBola - raio < 0) {
    velocidadeYBola *= -1;
  }
}

// Função para exibir a raquete
function mostrarARaquete() {  
  fill(color(255, 140, 0));
  rect(xRaquete, yRaquete, comprimentoDaRaquete, alturaDaRaquete);
}
function mostrarARaqueteOponente() {
  fill(color(0,191,255));
  rect(xRaqueteOponente,yRaqueteOponente,comprientoRaqueteOponente,                 alturaDaRaqueteOponente)
}
  
       
//verifica a colisao da raquete.
function verificarColisaoRaquete(){

     if  (xBola - raio < xRaquete + comprimentoDaRaquete
     &&  yBola - raio < yRaquete + alturaDaRaquete
     &&  yBola + raio > yRaquete) {

		velocidadeXBola *= -1;
		if(tocarSom){
			raquetada.play();
		}
	}  
}





function movimentacaoDaRaquete(){
  if (keyIsDown(65)){
    yRaquete -= 10;
  }

  if (keyIsDown(68)){
    yRaquete += 10;
 
  }
if (keyIsDown(87)){
    yRaquete -= 10;

 }
  if (keyIsDown(83)){
    yRaquete += 10;
 }
}

function movimentaRaqueteOponente() {
   if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10;
  }

  if (keyIsDown( DOWN_ARROW)){
    yRaqueteOponente += 10;
  }
   if (keyIsDown(37)){
    yRaqueteOponente -= 10;
  } 
 if (keyIsDown( 39)){
    yRaqueteOponente += 10;
}
  
 
}  

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
  fill(color (0,191,255) ) 
  rect(450, 10, 40, 20);
    fill(255);
  text(pontosDoOponente, 470, 26);
} 

function marcaPonto() {
  if (xBola > 590) {
    meusPontos += 1;
  
  }
  if (xBola < 10) {
    pontosDoOponente += 1;

  }
}

function verificarColisaoRaqueteOponete(){
  
	raqueteOponenteColidio = collideRectCircle(xRaqueteOponente,yRaqueteOponente, comprientoRaqueteOponente,alturaDaRaqueteOponente, xBola,yBola,raio);
  
    if (raqueteOponenteColidio) {
      velocidadeXBola *= -1;
	  raqueteBateuSemPontuar += 1;
	  if(tocarSom){
		raquetada.play();
	  }
   }
}

function verificarColisaoRaquete() {
	
	//collideRectCircle()
  if (xBola - raio < xRaquete + comprimentoDaRaquete &&
      yBola - raio < yRaquete + alturaDaRaquete &&
      yBola + raio > yRaquete) {

	velocidadeXBola *= -1;
	raqueteBateuSemPontuar += 1;
	if(tocarSom){
		raquetada.play();
	}
  }
} 

function verificarAlmentoDeVelocidade(){
	if	(raqueteBateuSemPontuar > 1) {
		raqueteBateuSemPontuar = 0;
		velocidadeXBola += 2;
		velocidadeYBola += 2;
	}
} 