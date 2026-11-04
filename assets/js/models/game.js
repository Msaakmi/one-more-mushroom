class Game{
  constructor(canvasId){
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.fps = GAME_FPS
    this.drawIntervalId = null

    this.ctx = this.canvas.getContext("2d")

    this.bg = new Background(this.ctx, 0)
  }

  start() {
    if(this.drawIntervalId === null){
      this.drawIntervalId = setInterval(() => {
        this.draw()
      }, this.fps);
    }
  }

  draw() {
    this.bg.draw()
  }

  clear() {
    
  }

  move() {

  }


}