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
    
    this.limit = LIMIT
    
  }

  draw() {
    this.sprite.x = this.x
    this.sprite.y = this.y

    this.sprite.draw()
  }

  move() {
    this.x += this.vx
    this.y += this.vy
    
    if(this.y < this.limit) {
      this.y = this.limit
    }

    if(this.x + this.w > this.ctx.canvas.width - this.limit) {
      this.x = (this.ctx.canvas.width - this.limit) - this.w
    }

    if(this.x < this.limit){
      this.x = this.limit
    }

    if(this.y + this.h > this.ctx.canvas.height - LIMIT) {
      this.y = (this.ctx.canvas.height - LIMIT) - this.h
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
          console.log("recolecting mushroom")
        }else{
          console.log("mushroom recolected (or no)")
        }
      break
    }
  }
}