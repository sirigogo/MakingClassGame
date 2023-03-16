let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dino ={
    x : 10,
    y : 200,
    width : 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2, this.x, this.y, 110, 100);
    }
}

let img1 = new Image();
img1.src = 'cactus.png';
let img2 = new Image();
img2.src = 'dinosaur.png';
//dino.draw();

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}

let timer = 0;
let cactusPlay = [];
let jumpTimer = 0;
let animation;

function framePlay(){
    animation = requestAnimationFrame(framePlay);
    timer++;

    ctx.clearRect(0,0,canvas.width, canvas.height);

    if(timer % 200 === 0){
        let cactus = new Cactus();
        cactusPlay.push(cactus);
    }
    cactusPlay.forEach((a, i, o)=>{
        if(a.x < 0){
            o.splice(i, 1)
        } 
        a.x--;
        crash(dino, a);

        a.draw();
    })
    if(jumping === true){
        dino.y--;
        jumpTimer++;
    }
    if(jumping === false){
        if(dino.y < 200){
            dino.y++;
        }
    }
    if(jumpTimer > 100){
        jumping = false;
        jumpTimer = 0;
    }
    dino.draw();
}

framePlay();

//충돌확인
function crash(dino, cactus){
    let xdistance = cactus.x - (dino.x + dino.width);
    let ydistance = cactus.y - (dino.y + dino.height);
    if(xdistance < 0 && ydistance < 0){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jumping = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})