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
        this.checkCollisions()
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
    let acceptedTrumpets = 0
    for(let i = 0; acceptedTrumpets < randomNumberOfTrumpets && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 40))
      const randomY = Math.floor(Math.random() * (this.bg.h - 40))
      const trumpet = new Mushroom(this.ctx, randomX, randomY, 40, 40, TROMPETA)
      const collides = this.mushrooms.some(m => m.collidesWith(trumpet))
      if(collides === false){
        this.mushrooms.push(
          trumpet
        )
        acceptedTrumpets++
      }
    }
    console.log("trompetes esperades " + randomNumberOfTrumpets)
    console.log("trompetes creades " + acceptedTrumpets)
    
    const randomNumberOfPoisonous1 = Math.floor((Math.random() * 20) + 1)
    let acceptedP1 = 0
    for(let i = 0; acceptedP1 < randomNumberOfPoisonous1 && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 40))
      const randomY = Math.floor(Math.random() * (this.bg.h - 40))
      const manita = new Mushroom(this.ctx, randomX, randomY, 40, 40, POISONOUS1, true)
      const collides = this.mushrooms.some(m => m.collidesWith(manita))
      if(collides === false){
        this.mushrooms.push(
          manita
        )
        acceptedP1++
      }
    }
    console.log("manites esperades " + randomNumberOfPoisonous1)
    console.log("manites generades " + acceptedP1)

    const randomNumberOfCep = Math.floor((Math.random() * 20) + 1)
    let acceptedCep = 0
    for(let i = 0; acceptedCep < randomNumberOfCep && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const cep = new Mushroom(this.ctx, randomX, randomY, 50, 50, CEP)
      const collides = this.mushrooms.some(m => m.collidesWith(cep))
      if(collides === false){
        this.mushrooms.push(
          cep
        )
        acceptedCep++
      }
    }
    console.log("ceps esperats " + randomNumberOfCep)
    console.log("ceps creats " + acceptedCep)
    
    const randomNumberOfPoisonous2 = Math.floor((Math.random() * 20) + 1)
    let acceptedP2 = 0
    for(let i = 0; acceptedP2 < randomNumberOfPoisonous2 && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 60))
      const randomY = Math.floor(Math.random() * (this.bg.h - 60))
      const dolent = new Mushroom(this.ctx, randomX, randomY, 60, 60, POISONOUS2, true)
      const collides = this.mushrooms.some(m => m.collidesWith(dolent))
      if(collides === false){
        this.mushrooms.push(
          dolent
        )
        acceptedP2++
      }
    }
    console.log("dolents esperats " + randomNumberOfPoisonous2)
    console.log("dolents generats " + acceptedP2)
    
    const randomNumberOfReig = Math.floor((Math.random() * 20) + 1)
    let acceptedReig = 0
    for(let i = 0; acceptedReig < randomNumberOfReig && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const reig = new Mushroom(this.ctx, randomX, randomY, 50, 50, OU_DE_REIG)
      const collides = this.mushrooms.some(m => m.collidesWith(reig))
      if(collides === false){
        this.mushrooms.push(
          reig
        )
        acceptedReig++
      }
    }
    console.log("reig esperat " + randomNumberOfReig)
    console.log("reig creats " + acceptedReig)
    
    const randomNumberOfRossinyols = Math.floor((Math.random() * 20) + 1)
    let acceptedRossinyols = 0
    for(let i = 0; acceptedRossinyols < randomNumberOfRossinyols && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const rossinyol = new Mushroom(this.ctx, randomX, randomY, 50, 50, ROSSINYOLS)
      const collides = this.mushrooms.some(m => m.collidesWith(rossinyol))
      if(collides === false){
        this.mushrooms.push(
          rossinyol
        )
        acceptedRossinyols++
      }
    }
    console.log("rossis esperats " + randomNumberOfRossinyols)
    console.log("rossis creats " + acceptedRossinyols)
    
    const randomNumberOfRovello = Math.floor((Math.random() * 20) + 1)
    let acceptedRovello = 0
    for(let i = 0; acceptedRovello < randomNumberOfRovello && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const rovello = new Mushroom(this.ctx, randomX, randomY, 50, 50, ROVELLO)
      const collides = this.mushrooms.some(mushroom => mushroom.collidesWith(rovello))
      if(collides === false){
        this.mushrooms.push(
          rovello
        )
        acceptedRovello++
      }
    }
    console.log("rovellons esperats " + randomNumberOfRovello)
    console.log("rovellons creats " + acceptedRovello)
    console.log(this.mushrooms)
  }
  
  checkCollisions() {
    this.mushrooms = this.mushrooms.filter(mushroom => {
      if(this.player.collidesWith(mushroom, this.bg.x, this.bg.y)){
        return false
      }
      return true
    })
  }
}