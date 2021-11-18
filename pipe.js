const HOLE_HEIGHT = 100;
const PIPE_WIDTH = 40;
const PIPE_SPEED = 0.2;
const PIPE_INTERVAL = 1400;
let timeSinceLastPipe=0;
let pipeArr=[];
let score =0;
export function setupPipe(){
    document.documentElement.style.setProperty('--pipe-width',PIPE_WIDTH);
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT);
    timeSinceLastPipe=1401; 
    pipeArr.forEach((pipe)=>{
        pipe.remove();
    })
    score=0;
}
export function updatePipe(delta){
    timeSinceLastPipe +=delta;

    if(timeSinceLastPipe>PIPE_INTERVAL){
        timeSinceLastPipe=0;
        createPipe();
    }

    pipeArr.forEach(pipe=>{
        if(pipe.left <  (window.innerWidth/2 -PIPE_WIDTH -20) ){
            score++;
            pipe.remove();
        }
        // if(pipe.left<0-PIPE_WIDTH){
        //     pipe.remove();
        // }
        pipe.left = pipe.left- PIPE_SPEED*delta;
    })
}
export function giveScore(){return score;}
export function sendPipeRect(){
    return pipeArr.flatMap((pipes)=>pipes.rect());
}
export function createPipe(){
    let pipeEL = document.createElement('div')
    let topPipe = createSegment("top");
    let bottomPipe = createSegment("bottom");
    pipeEL.append(topPipe);
    pipeEL.append(bottomPipe);
    pipeEL.classList.add('pipe');
    pipeEL.style.setProperty('--hole-top',randNo(HOLE_HEIGHT*1.5 ,window.innerHeight-HOLE_HEIGHT*0.5))
    document.body.append(pipeEL);
    const pipe={
        get left(){
            return parseFloat(getComputedStyle(pipeEL).getPropertyValue('--pipe-left'));
        },
        set left(value) {
            pipeEL.style.setProperty('--pipe-left',value)
        },
        remove(){
            pipeEL.remove();
        },
        rect(){
            return [
                topPipe.getBoundingClientRect(),
                bottomPipe.getBoundingClientRect()
            ]
        }
    }

    pipe.left = window.innerWidth-100;
    pipeArr.push(pipe)
}

export function crash(){
return 
}
function createSegment(position){
    let segment = document.createElement('div');
    segment.classList.add('segment',position);
    return segment;
}

function randNo(max,min){
    return Math.floor(Math.random()*(max-min) +1+min);
}