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

    this.canvas = this.ctx.canvas
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

    // BORDE SUPERIOR
    if(player.y <= player.limitY && player.vy < 0) {
      this.y -= player.vy
    }
    if(this.y >= 0){
      this.y = 0
      this.borderUp = true
    }else{
      this.borderUp = false
    }

    //BORDE DERECHO
    if(player.x + player.w >= this.canvas.width - player.limitX && player.vx > 0){
      this.x -= player.vx
    }

    if(this.x + this.w <= this.canvas.width) {
      this.x = this.canvas.width - this.w
      this.borderRight = true
    }else{
      this.borderRight = false
    }

    //BORDE INFERIOR
    if(player.y + player.h >= this.canvas.height - player.limitY && player.vy > 0) {
      this.y -= player.vy
    }
    if(this.y + this.h <= this.canvas.height){
      this.y = this.canvas.height - this.h
      this.borderDown = true
    }else{
      this.borderDown = false
    }

    //BORDE IZQUIERDO
    if(player.x <= player.limitX && player.vx < 0){
      this.x -= player.vx
    }
    if(this.x >= 0) {
      this.x = 0
      this.borderLeft = true
    }else{
      this.borderLeft = false
    }


  }
}