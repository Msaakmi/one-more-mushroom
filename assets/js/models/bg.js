class Background {
  constructor(ctx) {
    this.ctx = ctx
    
    this.image = new Image()
    this.image.src = BG_SRC
    
    this.image.onload = () => {
      this.w = this.image.width
      this.h = this.image.height

      this.x = (this.ctx.canvas.width - this.w) / 2
      this.y = (this.ctx.canvas.height - this.h) / 2

      this.image.isReady = true
    }

    this.vx = 0
  }

  draw() {
    if(this.image.isReady){
      this.ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  }

  move() {

  }
}