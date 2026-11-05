class Game{
  constructor(canvasId){
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.fps = GAME_FPS
    this.drawIntervalId = null

    this.ctx = this.canvas.getContext("2d")

    this.bg = new Background(this.ctx)
    this.player = new Player(this.ctx)
    this.mushroom = new Mushroom(this.ctx, 0, 0, 50, 50, MUSHROOM_SRC)
  }

  start() {
    if(this.drawIntervalId === null){
      this.setUpListeners()
      this.drawIntervalId = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
      }, this.fps);
    }
  }

  draw() {
    this.bg.draw()
    this.mushroom.draw(this.bg.x, this.bg.y)
    this.player.draw()
  }

  move() {
    this.player.move(this.bg.borderUp, this.bg.borderRight, this.bg.borderDown, this.bg.borderLeft)
    this.bg.move(this.player)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this,this.canvas.height)
  }

  stop() {
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null
  }

  setUpListeners() {
    addEventListener("keydown", (event) => {
      this.player.onKeyEvent(event)
    })

    addEventListener("keyup", (event) => {
      this.player.onKeyEvent(event)
    })
  }
}