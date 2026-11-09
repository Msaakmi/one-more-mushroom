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
    this.obstacle = new Obstacle(this.ctx, 1000, 1000, 100, 100, ROCKS)
    this.mushroomsCreated = false
    this.mushrooms = []

    this.isRecolecting = false
    this.animateFrames = 0
    this.mushroomCollided = null
    this.recivingDamage = false

    this.heart = new Image()
    this.heart.src = PLAYER_HEARTS
    this.heart.onload = () => {
      this.heart.isReady = true
    }

    this.accepted = {
      cep: 0,
      reig: 0,
      rossinyol: 0,
      rovello: 0,
      trompeta: 0,
      manita: 0,
      dolent: 0
    }
    
    this.inventory = {
      cep: 0,
      reig: 0,
      rossinyol: 0,
      rovello: 0,
      trompeta: 0,
      manita: 0,
      dolent: 0
    }
  }

  start() {
    if(this.drawIntervalId === null){
      this.setUpListeners()
      this.drawIntervalId = setInterval(() => {
        if(this.bg.image.isReady && this.mushroomsCreated === false){
          this.createMushrooms()
          this.mushroomsCreated = true
        }
        this.clear()
        this.move()
        this.recolectMushroom()
        this.player.countActualizer()
        if(this.player.animateFrames > 0){
          this.recivingDamage = true
        }else{
          this.recivingDamage = false
        }
        this.draw()
        this.mushroomsCounter()
        if(this.checkGameOver()){
          this.stop()
          this.gameOver()
        }
      }, this.fps);
    }
  }
  
  draw() {
    this.bg.draw()
    this.mushrooms.forEach(mushroom => {mushroom.draw(this.bg.x, this.bg.y)})
    this.obstacle.draw(this.bg.x, this.bg.y)
    this.player.draw(this.isRecolecting, this.recivingDamage)
    this.drawHearts()
  }

  move() {
    const playerX = this.player.x
    const playerY = this.player.y
    const bgX = this.bg.x
    const bgY = this.bg.y
    const borderUp = this.bg.borderUp
    const borderRight = this.bg.borderRight
    const borderDown = this.bg.borderDown
    const borderLeft = this.bg.borderLeft
    this.player.move(this.bg.borderUp, this.bg.borderRight, this.bg.borderDown, this.bg.borderLeft)
    this.bg.move(this.player)
    
    //COLISION CON OBSTACULOS
    const box = this.obstacle.boxToCollides()
    if(this.player.collidesWith(box, this.bg.x, this.bg.y)){
      this.player.x = playerX
      this.player.y = playerY
      this.bg.x = bgX
      this.bg.y = bgY
      this.bg.borderUp = borderUp
      this.bg.borderRight = borderRight
      this.bg.borderDown = borderDown
      this.bg.borderLeft = borderLeft
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  stop() {
    clearInterval(this.drawIntervalId)
    this.drawIntervalId = null
  }

  gameOver(){
    window.location.reload()
  }

  setUpListeners() {
    addEventListener("keydown", (event) => {
      this.player.onKeyEvent(event)
    })

    addEventListener("keyup", (event) => {
      this.player.onKeyEvent(event)
    })
  }

  createMushrooms() {
    const randomNumberOfTrumpets = Math.floor((Math.random() * 20) + 1)
    let acceptedTrumpets = 0
    for(let i = 0; acceptedTrumpets < randomNumberOfTrumpets && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 40))
      const randomY = Math.floor(Math.random() * (this.bg.h - 40))
      const trumpet = new Mushroom(this.ctx, randomX, randomY, 40, 40, TROMPETA, "trompeta", false)
      const collides = this.mushrooms.some(m => m.collidesWith(trumpet))
      if(collides === false){
        this.mushrooms.push(
          trumpet
        )
        acceptedTrumpets++
      }
    }
    this.accepted.trompeta = acceptedTrumpets
    
    const randomNumberOfPoisonous1 = Math.floor((Math.random() * 20) + 1)
    let acceptedP1 = 0
    for(let i = 0; acceptedP1 < randomNumberOfPoisonous1 && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 40))
      const randomY = Math.floor(Math.random() * (this.bg.h - 40))
      const manita = new Mushroom(this.ctx, randomX, randomY, 40, 40, POISONOUS1, "manita", true)
      const collides = this.mushrooms.some(m => m.collidesWith(manita))
      if(collides === false){
        this.mushrooms.push(
          manita
        )
        acceptedP1++
      }
    }
    this.accepted.manita = acceptedP1

    const randomNumberOfCep = Math.floor((Math.random() * 20) + 1)
    let acceptedCep = 0
    for(let i = 0; acceptedCep < randomNumberOfCep && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const cep = new Mushroom(this.ctx, randomX, randomY, 50, 50, CEP, "cep", false)
      const collides = this.mushrooms.some(m => m.collidesWith(cep))
      if(collides === false){
        this.mushrooms.push(
          cep
        )
        acceptedCep++
      }
    }
    this.accepted.cep = acceptedCep
    
    const randomNumberOfPoisonous2 = Math.floor((Math.random() * 20) + 1)
    let acceptedP2 = 0
    for(let i = 0; acceptedP2 < randomNumberOfPoisonous2 && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 60))
      const randomY = Math.floor(Math.random() * (this.bg.h - 60))
      const dolent = new Mushroom(this.ctx, randomX, randomY, 60, 60, POISONOUS2, "dolent", true)
      const collides = this.mushrooms.some(m => m.collidesWith(dolent))
      if(collides === false){
        this.mushrooms.push(
          dolent
        )
        acceptedP2++
      }
    }
    this.accepted.dolent = acceptedP2
    
    const randomNumberOfReig = Math.floor((Math.random() * 20) + 1)
    let acceptedReig = 0
    for(let i = 0; acceptedReig < randomNumberOfReig && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const reig = new Mushroom(this.ctx, randomX, randomY, 50, 50, OU_DE_REIG, "reig")
      const collides = this.mushrooms.some(m => m.collidesWith(reig))
      if(collides === false){
        this.mushrooms.push(
          reig
        )
        acceptedReig++
      }
    }
    this.accepted.reig = acceptedReig
    
    const randomNumberOfRossinyols = Math.floor((Math.random() * 20) + 1)
    let acceptedRossinyols = 0
    for(let i = 0; acceptedRossinyols < randomNumberOfRossinyols && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const rossinyol = new Mushroom(this.ctx, randomX, randomY, 50, 50, ROSSINYOLS, "rossinyol")
      const collides = this.mushrooms.some(m => m.collidesWith(rossinyol))
      if(collides === false){
        this.mushrooms.push(
          rossinyol
        )
        acceptedRossinyols++
      }
    }
    this.accepted.rossinyol = acceptedRossinyols
    
    const randomNumberOfRovello = Math.floor((Math.random() * 20) + 1)
    let acceptedRovello = 0
    for(let i = 0; acceptedRovello < randomNumberOfRovello && i < 100; i++){
      const randomX = Math.floor(Math.random() * (this.bg.w - 50))
      const randomY = Math.floor(Math.random() * (this.bg.h - 50))
      const rovello = new Mushroom(this.ctx, randomX, randomY, 50, 50, ROVELLO, "rovello")
      const collides = this.mushrooms.some(mushroom => mushroom.collidesWith(rovello))
      if(collides === false){
        this.mushrooms.push(
          rovello
        )
        acceptedRovello++
      }
    }
    this.accepted.rovello = acceptedRovello
  }
  
  checkCollisions() {
  }

  recolectMushroom() {
    const collidesWithMushroom = this.mushrooms.some(mushroom => this.player.collidesWith(mushroom, this.bg.x, this.bg.y))
    if(this.player.collectPressed && collidesWithMushroom){
      if(this.isRecolecting === false){
        this.isRecolecting = true
        this.animateFrames = ANIMATE_TIME
        this.mushroomCollided = this.mushrooms.find(mushroom => {
          if(this.player.collidesWith(mushroom, this.bg.x, this.bg.y)){
            return mushroom
          }
        })
      }else{
        if(this.player.collidesWith(this.mushroomCollided, this.bg.x, this.bg.y)){
          this.animateFrames--
          if(this.animateFrames === 0){
            if(this.mushroomCollided.type === "cep"){
              this.inventory.cep += 1
            }
            if(this.mushroomCollided.type === "reig"){
              this.inventory.reig += 1
            }
            if(this.mushroomCollided.type === "rossinyol"){
              this.inventory.rossinyol += 1
            }
            if(this.mushroomCollided.type === "rovello"){
              this.inventory.rovello += 1
            }
            if(this.mushroomCollided.type === "trompeta"){
              this.inventory.trompeta += 1
            }
            if(this.mushroomCollided.type === "manita"){
              this.inventory.manita += 1
            }
            if(this.mushroomCollided.type === "dolent"){
              this.inventory.dolent += 1
            }
            if(this.mushroomCollided.isPoisonous === true){
              this.player.recieveDamage(1)
            }
            this.mushrooms = this.mushrooms.filter(mush => {
              if(mush === this.mushroomCollided){
                return false
              }
              return true
            })
            this.isRecolecting = false
            this.animateFrames = 0
            this.mushroomCollided = null
          }
        }else{
          this.isRecolecting = false
          this.animateFrames = 0
          this.mushroomCollided = null
        }
      }
    }else{
      this.isRecolecting = false
      this.animateFrames = 0
      this.mushroomCollided = null
    }
  }

  mushroomsCounter() {
    const cepCounter = document.getElementById("cep_counter")
    const reigCounter = document.getElementById("ouDeReig_counter")
    const rossinyolsCounter = document.getElementById("rossinyols_counter")
    const rovelloCounter = document.getElementById("rovello_counter")
    const trompetaCounter = document.getElementById("trompeta_counter")

    cepCounter.textContent = `${this.inventory.cep}/${this.accepted.cep}`
    reigCounter.textContent = `${this.inventory.reig}/${this.accepted.reig}`
    rossinyolsCounter.textContent = `${this.inventory.rossinyol}/${this.accepted.rossinyol}`
    rovelloCounter.textContent = `${this.inventory.rovello}/${this.accepted.rovello}`
    trompetaCounter.textContent = `${this.inventory.trompeta}/${this.accepted.trompeta}`
  }

  drawHearts() {
    if(this.heart.isReady){
      for(let i = 0; i < this.player.lives; i++){
        this.ctx.drawImage(
          this.heart,
          (10 + HEARTS_W) * i + 20,
          20,
          HEARTS_W,
          HEARTS_H
        )
      }
    }
  }

  checkGameOver() {
    return this.player.lives <= 0
  }
}