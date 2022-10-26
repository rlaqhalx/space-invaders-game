import Tank from './Tank'

let shoot = false;

class Missiles extends Tank {
    constructor(imgurl, audio, x, y, width, height, visible) {
    super(imgurl, x + 15, y,  width, height, 0, 0);
    document.addEventListener("keydown", this.spaceHandler.bind(this));
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
    this.visible = visible;
    this.audio = audio;
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx)
        } 
    }

    move(canvasWidth) {
        if (shoot === false) {
            super.move();
            if (this.x < 15) {
            this.x = 15;
            } else if (this.x + this.width + 15 > canvasWidth) {
            this.x = canvasWidth - this.width - 15;
            } 
        } else {
            this.y += this.dy;
            this.dy = - 4;
        }
    }

    colides(invader) {
        if (this.visible && this.intersects(invader)) {
            this.visible = false;
            return true;
        } 
        return false;
    }

    keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
        this.dx = 7;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
        this.dx = -7;
        }
    }

    keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
        this.dx = 0;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
        this.dx = 0;
        }
    }

    spaceHandler(e) {
        if (e.keyCode === 32) {
            this.audio.play();
            shoot = true;
        }
    }
      
    hitTop(canvasHeight) {
        if (this.y <= (canvasHeight - 650) && this.visible) {
            this.visible = false;
            return true;
        } else {
            return false;
        }
    }
  
}



export default Missiles