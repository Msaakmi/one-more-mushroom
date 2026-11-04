class Sprite {
  constructor(ctx, src, x, y, w, h) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.sprite = new Image()
    
    this.sprite.cols = 4
    this.sprite.rows = 4
    this.sprite.colsFrame = 0
    this.sprite.rowsFrame = 0

    this.sprite.onload = () => {
      
      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.cols)
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.rows)
      
      this.sprite.isReady = true
    }
    
    this.sprite.src = src
  }

  draw() {
    if(this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.colsFrame * this.sprite.frameW,
        this.sprite.rowsFrame * this.sprite.frameH,
        this.sprite.frameW,
        this.sprite.frameH,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  }
}