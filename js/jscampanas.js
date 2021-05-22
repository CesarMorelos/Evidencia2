var sonido = document.createElement("iframe");
let sequence = [];
let humanSequence = [];
let level = 0;

const empezar = document.querySelector('.iniciar');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function reiniciar() {
  sequence = [];
  humanSequence = [];
  level = 0;
  empezar.classList.remove('hidden');
  
  info.classList.add('hidden');
  tileContainer.classList.add('click');
}

function turno(level) {
  tileContainer.classList.remove('click');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function ronda(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 800); //tenia 600
  });
}

function nextStep() {
  const tiles = ['rojo', 'verde', 'azul', 'amarillo','morado'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function siguienteronda() {
  level += 1;

  tileContainer.classList.add('click');
  
  heading.textContent = `Level ${level} of 2`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  ronda(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    turno(level);
  }, level * 600 + 1500); //tenia 1000
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    sonidos('vuelveintentar');
    setTimeout(reiniciar,1500) //tenia 1000
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      sonidos('felicidadesX3');
      setTimeout(repetir,1500);
      return
    }

    humanSequence = [];
  
    setTimeout(() => {
       sonidos('CI_excelente');
    setTimeout(siguienteronda,1000)
     
    }, 50);
    return;
  }

  
}

function startGame() {
  empezar.classList.add('hidden');
  info.classList.remove('hidden');
 
  siguienteronda();
}

empezar.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});


/*Funcion para mostrar los sonidos, solo se tiene que mandar el mombre del sonido*/
function sonidos(n){
    sonido.setAttribute("src", "audio/"+n+".mp3");
    document.body.appendChild(sonido);

}

//sonidos para leer las instrucciones
function leeinstrucciones()
{
    sonido.setAttribute("src", "audio/Instrucciones.mp3");
    document.body.appendChild(sonido);
    
   
}/*Se utiliza para repertir el juevo las veces que sean necesarias*/
function repetir()
{
    window.location = 'index.html';
}

function iniciar(){
  setTimeout(function(){document.getElementById("inicio").style.display = "block";},100)
}