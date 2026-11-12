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

    this.walkingAudio = new Audio("assets/music/walking.mp3")
    this.walkingAudio.loop = true
    this.walkingAudio.volume = 0.1
    
    this.limitX = LIMIT_X
    this.limitY = LIMIT_Y

    this.collectPressed = false
    this.animateFrames = 0

    this.lives = 3
  }
  
  draw(isRecolecting, recivingDamage) {
    this.sprite.x = this.x
    this.sprite.y = this.y
    
    const isMoving = this.vx !== 0 || this.vy !== 0
    this.sprite.animate(isRecolecting, isMoving, recivingDamage)
    this.sprite.draw()
  }

  move(borderUp, borderRight, borderDown, borderLeft) {
    this.x += this.vx
    this.y += this.vy
    
    //BORDE SUPERIOR
    let bordeSuperior = this.limitY
    if(borderUp) {
      bordeSuperior = 0
    }else{
      bordeSuperior = this.limitY
    }

    if(this.y < bordeSuperior) {
      this.y = bordeSuperior
    }
    
    //BORDE DERECHO
    let bordeDerecho = this.limitX
    if(borderRight){
      bordeDerecho = 0
    }else{
      bordeDerecho = this.limitX
    }

    if(this.x + this.w > this.ctx.canvas.width - bordeDerecho) {
      this.x = (this.ctx.canvas.width - bordeDerecho) - this.w
    }
    
    //BORDE INFERIOR
    let bordeInferior = this.limitY
    if(borderDown){
      bordeInferior = 0
    }else{
      bordeInferior = this.limitY
    }

    if(this.y + this.h > this.ctx.canvas.height - bordeInferior) {
      this.y = (this.ctx.canvas.height - bordeInferior) - this.h
    }
    
    //BORDE IZQUIERDO
    let bordeIzq = this.limitX
    if(borderLeft){
      bordeIzq = 0
    }else{
      bordeIzq = this.limitX
    }
    if(this.x < bordeIzq){
      this.x = bordeIzq
    }    

    if(this.vx != 0 || this.vy != 0){
      this.walkingAudio.play()
    }else{
      this.walkingAudio.pause()
      this.walkingAudio.currentTime = 0
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
          this.collectPressed = true
        }else{
          this.collectPressed = false
        }
      break
    }
  }

  collidesWith(element, bgX, bgY) {
    return (this.x + this.w > element.x + bgX) &&
    (this.x < (element.x + bgX) + element.w) &&
    (this.y + this.h > element.y + bgY) &&
    (this.y < (element.y + bgY) + element.h)
  }

  recieveDamage(damage) {
    if(this.animateFrames > 0){
      return
    }else{
      this.lives -= damage
      if(this.lives < 0){
        this.lives = 0
      }
      this.animateFrames = ANIMATE_TIME
    }
  }

  countActualizer(){
    if(this.animateFrames > 0){
      this.animateFrames--
    }else if(this.animateFrames <= 0){
      this.animateFrames = 0
    }
  }


}