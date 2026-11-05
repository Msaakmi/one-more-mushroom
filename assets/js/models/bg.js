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

    this.player = this.ctx.player
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

  move(player) {
    const canvas = this.ctx.canvas
    // BORDE SUPERIOR
    if(player.y <= player.limitY && player.vy < 0) {
      this.y -= player.vy
    }
    if(this.y >= 0){
      this.y = 0
    }

    //BORDE DERECHO
    if(player.x + player.w >= canvas.width - player.limitX && player.vx > 0){
      this.x -= player.vx
    }

    if(this.x + this.w <= canvas.width) {
      this.x = canvas.width - this.w
    }

    //BORDE INFERIOR
    if(player.y + player.h >= canvas.height - player.limitY && player.vy > 0) {
      this.y -= player.vy
    }
    if(this.y + this.h <= canvas.height){
      this.y = canvas.height - this.h
    }

    //BORDE IZQUIERDO
    if(player.x <= player.limitX && player.vx < 0){
      this.x -= player.vx
    }
    if(this.x >= 0) {
      this.x = 0
    }

  }
}