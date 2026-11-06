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
    this.mushroomsCreated = false
    this.mushrooms = []
  }

  start() {
    if(this.drawIntervalId === null){
      this.setUpListeners()
      this.drawIntervalId = setInterval(() => {
        if(this.bg.image.isReady && this.mushroomsCreated === false){
          this.createMushroom()
          this.mushroomsCreated = true
        }
        this.clear()
        this.move()
        this.draw()
      }, this.fps);
    }
  }
  
  draw() {
    this.bg.draw()
    this.mushrooms.forEach(mushroom => {mushroom.draw(this.bg.x, this.bg.y)
    })
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

  createMushroom() {
    const randomNumberOfTrumpets = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfTrumpets; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, TROMPETA)
      )
    }
    
    const randomNumberOfPoisonous1 = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfPoisonous1; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, POISONOUS1)
      )
    }
    
    const randomNumberOfCep = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfCep; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, CEP)
      )
    }
    
    const randomNumberOfPoisonous2 = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfPoisonous2; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, POISONOUS2)
      )
    }
    
    const randomNumberOfReig = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfReig; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, OU_DE_REIG)
      )
    }
    
    const randomNumberOfRossinyols = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfRossinyols; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, ROSSINYOLS)
      )
    }
    
    const randomNumberOfRovello = Math.floor((Math.random() * 20) + 1)

    for(let i = 0; i < randomNumberOfRovello; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      this.mushrooms.push(
        new Mushroom(this.ctx, randomX, randomY, 50, 50, ROVELLO)
      )
    }
    console.log(this.mushrooms)
  }
}