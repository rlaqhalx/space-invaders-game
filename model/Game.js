import Tank from "./Tank"
import Missiles from "./Missiles";
import Invaders from "./Invaders";

const canvas = document.getElementById("myCanvas");
const spaceshuttle_img = new Image(50, 50);
spaceshuttle_img.src = './assets/tank.png'
const missiles_img = new Image();
missiles_img.src = "./assets/missile.png";
const missile_audio = new Audio("./assets/shoot.wav");
const invader_img = new Image();
invader_img.src = "./assets/invader.png";
const invader_audio = new Audio("./assets/explosion.wav");
const game_audio = new Audio("./assets/music.mpeg")
game_audio.loop = true;


let spaceshuttle = new Tank(spaceshuttle_img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
let missiles = [];
let missile_count = 10;
let missile = new Missiles(missiles_img, missile_audio,  0, canvas.height, 20, 20, false);
let invaders = [];
let invader_width = Math.floor(Math.random() * (canvas.width -60) - (canvas.width-450)) + canvas.width-450
let invader_speed = Math.floor(Math.random() * (10 - 2)) + 2;
let invader = {}
let scores  = 0;
let isGameStart = false;
let isGameOver = false;


function invader_counter() {
    invader_width = Math.floor(Math.random() * (canvas.width -60) - (canvas.width-450)) + canvas.width-450
    invader_speed = Math.floor(Math.random() * (5 - 1)) + 1;
    invader = new Invaders(invader_img, invader_audio, invader_width, canvas.height -600, 40, 40, invader_speed);
    invaders.push(invader);
    setTimeout(invader_counter, (Math.random() * (3000 - 800))+ 800)
  }



class Game {
    constructor(canvaswidth, canvasheight) {
        this.canvaswidth = canvaswidth;
        this.canvashight = canvasheight;
        document.addEventListener("keyup", this.keyStart.bind(this));
        document.addEventListener("keydown", this.keySpaceHandler.bind(this));
    }


    keySpaceHandler(e) {
        if (e.keyCode === 32 && missile_count > 0) {
            missile = new Missiles(missiles_img, missile_audio, spaceshuttle.x, canvas.height - 60, 20, 20, true);
            missiles.push(missile);
            missile_count --; 
          }
    }

    keyStart(e) {
        if (isGameStart === true) return true;
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            isGameStart = true;
            if (isGameStart === true) {
              game_audio.play();
              invader_counter();
              }
            }
    }
    

    draw(ctx) {       
        ctx.font = '16px Arial'
        ctx.fillStyle = "rgb(0, 149, 246)";
        ctx.fillText(`Invaders shot down: ${scores}`, 10, 20)
        ctx.fillText(`Missiles remaining: ${missile_count}`, 10 , 40)

        spaceshuttle.draw(ctx);
        spaceshuttle.move(canvas.width);
        spaceshuttle.colides(invader)
        
        
        missiles.forEach((missile) => {
            missile.draw(ctx);
            missile.move(canvas.width);
            if (missile.hitTop(canvas.height)) {
            missile_count++;
            delete missile.Missiles;
            }
        })
        
        invaders.forEach((invader) => {
            invader.draw(ctx);
            invader.move();

            if (invader.colides(missile)) {
            scores ++;
            missile.colides(invader)
            if (missile_count < 10) {
                missile_count++;
                delete missile.Missiles;
                delete invader.Invaders;
            }
            }
            if (invader.colidesWithTank(spaceshuttle)) {
                spaceshuttle.colides(invader)
                delete invader.Invaders;
                game_audio.pause()
                isGameOver = true;
            }
            if (invader.hitBottom(canvas.height)) {
                delete invader.Invaders;
                game_audio.pause()
                isGameOver = true;
            }

        }) 
    }

    gameover() {
        if (!isGameOver) {
            return false;
        } else  {
            return true;
        }
    }

    return_score() {
        return scores
    }

    end_page(ctx) {
        spaceshuttle = new Tank(spaceshuttle_img, canvas.width / 2 - 25, canvas.height - 60, 50, 50)
        spaceshuttle.draw(ctx);
    }
}

export default Game