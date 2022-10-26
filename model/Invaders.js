import Sprite from './Sprite'

class Invaders extends Sprite {
    constructor(imgurl, audio, x, y, width, height, dy) {
    super(imgurl, x, y, width, height, 0, dy);
    this.visible = true;
    this.audio = audio;
    }

    move() {
        super.move();
        let rand = Math.random();
        // jiggle left and right
        if (rand > 0.5) {
            this.dx = Math.sin(Math.random()) + 0.4;
        } else {
            this.dx = -(Math.sin(Math.random()) + 0.4);
        }
    }

    draw(ctx) {
        if (this.visible) {
            super.draw(ctx)
        }
    }
      
    colides(missile) {
        if (this.visible && this.intersects(missile) && missile.visible === true) {
            this.visible = false; 
            this.audio.play()
            return true;
        } 
        return false;
    }

    colidesWithTank(tank) {
        if(this.visible && this.intersects(tank)) {
            this.audio.play()
            return true;
        }
        return false;
    }

    hitBottom(canvasHeight) {
        if (this.y >= (canvasHeight - 5) && this.visible === true) {
            return true;
        } else {
            return false;
        }
    }
}

export default Invaders
