import "./style.css";
import Game from "./model/Game";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas.width, canvas.height);

function draw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  
  if (game.gameover() === false) {
    game.draw(ctx);
  } else {
    let scores = game.return_score()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(`Invaders shot down: ${scores}`, 10, 20)
    ctx.fillText('Game Over!', 10 , 40)
    game.end_page(ctx);
  }

  window.requestAnimationFrame(draw);
}

game.onload = draw();


