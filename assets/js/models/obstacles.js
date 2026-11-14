class Obstacle {
  constructor(ctx, x, y, colFrame, rowFrame, w, h, src, collidesBox, inflictsDamage = false) {
    this.ctx = ctx
    this.x = x
    this.y = y

    this.w = w
    this.h = h

    this.inflictsDamage = inflictsDamage

    this.sprite = new Image()
    
    this.sprite.cols = 3
    this.sprite.rows = 2
    this.sprite.colsFrame = colFrame
    this.sprite.rowsFrame = rowFrame

    this.sprite.onload = () => {
      
      this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.cols)
      this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.rows)
      
      this.sprite.isReady = true
    }
    
    this.sprite.src = src

    this.collidesBox = collidesBox
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

      // this.ctx.strokeRect(
      //   this.x + bgX + this.collidesBox.offsetX,
      //   this.y + bgY + this.collidesBox.offsetY,
      //   this.collidesBox.w,
      //   this.collidesBox.h
      // )
    }
  }

  collidesWith(element) {
    return (this.x + this.w > element.x) &&
    (this.x < element.x + element.w) &&
    (this.y + this.h > element.y) &&
    (this.y < element.y + element.h)
  }

  boxToCollides() {
    return {
      x: this.x + this.collidesBox.offsetX,
      y: this.y + this.collidesBox.offsetY,
      w: this.collidesBox.w,
      h: this.collidesBox.h
    }
  }
}