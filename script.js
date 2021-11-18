import { updateBird , setInitialTop , sendBirdRect} from './bird.js'
import { updatePipe, setupPipe, sendPipeRect , giveScore } from './pipe.js'

document.addEventListener('keypress',start ,{once:true});
let title = document.querySelector('[data-title]');
let score = document.querySelector('[data-score]');
let lastRefreshTime;
let delta;
function start(){
    title.classList.add("hide"); 
    score.classList.add("hide");
    delta=0; lastRefreshTime=null;
    setInitialTop(); 
    setupPipe();
    window.requestAnimationFrame(updateFrame);
}

function updateFrame(time){
    if(lastRefreshTime==null){ 
        lastRefreshTime=time; 
        window.requestAnimationFrame(updateFrame);
        return;
    }
    delta = time-lastRefreshTime; 
    lastRefreshTime=time;    
    if(checkCrash()){
        return stop();
    }
    updateBird(delta); 
    updatePipe(delta);
    window.requestAnimationFrame(updateFrame);
}

function checkCrash(){
    let birdRect = sendBirdRect();
    let inside = sendPipeRect().some(rect=>isCollision(birdRect,rect));
    let outside = birdRect.top<0 || birdRect.bottom>window.innerHeight;
    return outside || inside;
}
function isCollision(rect1,rect2){
    return (  rect1.left<rect2.right && rect1.top<rect2.bottom && rect1.right>rect2.left && rect1.bottom>rect2.top )
}
function  stop(){
    title.classList.remove("hide");
    score.classList.remove("hide");
    score.textContent = `Your Score is ${giveScore()}`;
setTimeout(() => {
    window.addEventListener('keypress',start,{once:true});
}, 100);
}
    
