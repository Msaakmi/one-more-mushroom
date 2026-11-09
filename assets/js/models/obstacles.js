class Obstacle {
  constructor(ctx, x, y, w, h, src, inflictsDamage = false) {
    this.ctx = ctx
    this.x = x
    this.y = y

    this.w = w
    this.h = h

    this.inflictsDamage = inflictsDamage

    this.sprite = new Image()
    
    this.sprite.cols = 3
    this.sprite.rows = 2
    this.sprite.colsFrame = 0
    this.sprite.rowsFrame = 0

    this.sprite.onload = () => {
      
      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.cols)
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.rows)
      
      this.sprite.isReady = true
    }
    
    this.sprite.src = src

    this.firstRockX = 35
    this.firstRockY = 55
    this.firstRockW = 40
    this.firstRockH = 25
  }
  
  draw(bgX, bgY) {
    if(this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.colsFrame * this.sprite.frameW,
        this.sprite.rowsFrame * this.sprite.frameH,
        this.sprite.frameW,
        this.sprite.frameH,
        this.x + bgX,
        this.y + bgY,
        this.w,
        this.h
      )
    }
  }

  boxToCollides() {
    return {
      x: this.x + this.firstRockX,
      y: this.y + this.firstRockY,
      w: this.firstRockW,
      h: this.firstRockH
    }
  }
}