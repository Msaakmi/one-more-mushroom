class Player {
  constructor(ctx){
    this.ctx = ctx
    
    this.vx = 0
    this.vy = 0
    
    this.w = PLAYER_W
    this.h = PLAYER_H
    
    
    this.x = (this.ctx.canvas.width - this.w) / 2
    this.y = (this.ctx.canvas.height - this.h) / 2

    this.spriteUp = new Sprite(this.ctx, PLAYER_IMG_UP, this.x, this.y, this.w, this.h)
    this.spriteRight = new Sprite(this.ctx, PLAYER_IMG_RIGHT, this.x, this.y, this.w, this.h)
    this.spriteDown = new Sprite(this.ctx, PLAYER_IMG_DOWN, this.x, this.y, this.w, this.h)
    this.spriteLeft = new Sprite(this.ctx, PLAYER_IMG_LEFT, this.x, this.y, this.w, this.h)
    this.sprite = this.spriteDown
    
    this.limitX = LIMIT_X
    this.limitY = LIMIT_Y

    this.isRecolecting = false
    this.recolectingFrames = 0
  }
  
  draw() {
    this.sprite.x = this.x
    this.sprite.y = this.y
    
    const isMoving = this.vx !== 0 || this.vy !== 0
    this.sprite.animate(isMoving)
    this.sprite.draw()
  }

  move() {
    this.x += this.vx
    this.y += this.vy
    
    if(this.y < this.limitY) {
      this.y = this.limitY
    }

    if(this.x + this.w > this.ctx.canvas.width - this.limitX) {
      this.x = (this.ctx.canvas.width - this.limitX) - this.w
    }

    if(this.x < this.limitX){
      this.x = this.limitX
    }

    if(this.y + this.h > this.ctx.canvas.height - this.limitY) {
      this.y = (this.ctx.canvas.height - this.limitY) - this.h
    }
  }

  onKeyEvent(event) {
    const isPressed = event.type === "keydown"

    switch(event.code) {
      case KEY_UP:
        if(isPressed){
          this.sprite = this.spriteUp
          this.vy = -VX
        }else{
          this.vy = 0
        }
      break

      case KEY_RIGHT:
        if(isPressed){
          this.sprite = this.spriteRight
          this.vx = VX
        }else{
          this.vx = 0
        }
      break

      case KEY_DOWN:
        if(isPressed){
          this.sprite = this.spriteDown
          this.vy = VX
        }else{
          this.vy = 0
        }
      break

      case KEY_LEFT:
        if(isPressed){
          this.sprite = this.spriteLeft
          this.vx = -VX
        }else{
          this.vx = 0
        }
      break

      case SPACE:
        if(isPressed){
          this.isRecolecting = true
          this.recolectingFrames = RECOLECTING_TIME
          console.log("recolecting mushroom")
        }else{
          this.isRecolecting = false
          console.log("mushroom recolected (or no)")
        }
      break
    }
  }
}