let bird = document.querySelector('[data-bird]');
const BIRD_SPEED = .35;
const BIRD_UP_TIME = 180;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

bird.style.setProperty('--bird-left',window.innerWidth/2)
export function updateBird(delta){
    if(timeSinceLastJump<BIRD_UP_TIME){
        setBirdTop(getBirdTop() - BIRD_SPEED*delta);
    }
    else{
        setBirdTop(getBirdTop() + BIRD_SPEED*delta);
    }
    timeSinceLastJump+=delta;
}

export function setInitialTop(){
    setBirdTop(window.innerHeight/2);
    window.removeEventListener('keypress',handelJump);
    window.addEventListener('keypress',handelJump);
} 

export function sendBirdRect(){
  return bird.getBoundingClientRect();
}

function getBirdTop(){
    return parseFloat(window.getComputedStyle(bird).getPropertyValue('--bird-top'));
}

function setBirdTop(top){
    bird.style.setProperty('--bird-top',top)
}

function handelJump(e){
    if(e.code !=="Space")  return;
 
    timeSinceLastJump=0;
}

