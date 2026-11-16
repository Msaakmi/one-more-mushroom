class Game{
  constructor(canvasId){
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = CANVAS_W
    this.canvas.height = CANVAS_H

    this.fps = GAME_FPS
    this.drawIntervalId = null

    this.ctx = this.canvas.getContext("2d")

    this.bgMusic = new Audio("assets/music/minecraft.mp3")
    this.bgMusic.volume = 0.4
    this.bgMusic.loop = true

    this.bg = new Background(this.ctx)
    this.player = new Player(this.ctx)

    this.obstacles = []
    this.obstaclesCreated = false
    this.mushrooms = []
    this.mushroomsCreated = false

    this.isRecolecting = false
    this.animateFrames = 0 //CONTADOR PARA LA ANIMACIÓN DE RECOGIDA DEL SPRITE
    this.recolectingAudio = new Audio("assets/music/eating-mushroom.mp3")
    this.recolectingAudio.volume = 0.1
    this.recolectedAudio = new Audio("assets/music/grab.mp3")
    this.recolectedAudio.volume = 0.2

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

    this.defeatAudio = new Audio("assets/music/defeat.mp3")
    this.victoryAudio = new Audio("assets/music/victory.mp3")
  }

  start() {
    if(this.drawIntervalId === null){
      this.previousFrame = null
      this.accumulatedTime = 0

      this.bgMusic.play()
      this.setUpListeners()

      this.drawIntervalId = requestAnimationFrame(
        time => this.loop(time) //CAMBIO DE SETINTERVAL A ESTE SISTEMA PARA QUE FUNCIONE EN MOBIL
      )
    }
  }

  loop(timestamp){
    if(this.drawIntervalId === null) return

    if(this.previousFrame === null){
      this.previousFrame = timestamp
    }

    const elapsed = Math.min(
      timestamp - this.previousFrame,
      100
    )
    
    this.previousFrame = timestamp
    this.accumulatedTime += elapsed

    while (this.accumulatedTime >= this.fps) { //EL NUEVO LOOP
      this.accumulatedTime -= this.fps
      this.update()

    if (this.drawIntervalId === null) return
    }

    this.drawIntervalId = requestAnimationFrame( // SISTEMA PARA CONTAR EL TIEMPO
      timestamp => this.loop(timestamp)
    )
  }

  update() { //TODA LA LÓGICA DEL SETINTERVAL
    if(this.bg.image.isReady && this.mushroomsCreated === false){
      this.createMushrooms()
      this.mushroomsCreated = true
    }

    if(this.bg.image.isReady && this.obstaclesCreated === false){
      this.createObstacles()
      this.obstaclesCreated = true
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
    const checkGameover = this.checkGameOver()

    if(checkGameover === "defeat"){
      this.stop()
      this.gameOver()
    }else if(checkGameover ==="victory"){
      this.stop()
      this.victory()
    }
  }
  
  draw() {
    this.bg.draw()
    this.mushrooms.forEach(mushroom => {mushroom.draw(this.bg.x, this.bg.y)}) //LE PASO LOS DATOS DEL BG PARA QUE SE MUEVAN CON ÉL
    this.obstacles.forEach(obstacle => obstacle.draw(this.bg.x, this.bg.y))
    this.player.draw(this.isRecolecting, this.recivingDamage) //SISTEMA DE ANIMACIONES DE SPRITE (PRIMERO SE LO PASO A PLAYER Y LUEGO A SPRITE)
    this.drawHearts()
  }

  move() { //PRIMERO CAPTURAMOS POSICIONES Y LÍMITES
    const playerX = this.player.x
    const playerY = this.player.y
    const bgX = this.bg.x
    const bgY = this.bg.y
    const borderUp = this.bg.borderUp
    const borderRight = this.bg.borderRight
    const borderDown = this.bg.borderDown
    const borderLeft = this.bg.borderLeft
    this.player.move(this.bg.borderUp, this.bg.borderRight, this.bg.borderDown, this.bg.borderLeft) //LE PASAMOS LOS LÍMITES DEL BG PARA QUE PUEDA LLEGAR AL FINAL
    this.bg.move(this.player) //PARA QUE SE MUEVA AL CONTRARIO DEL PLAYER
    
    // COLISION CON OBSTACULOS QUE NO HACEN DAÑO
    const playerCollidesWithBox = this.obstacles.some(obstacle => { 
      if(obstacle.inflictsDamage === false) { //CREAMOS ESTE IF PARA QUE DEVUELVA TRUE CUANDO EL OBSTACULO NO INFLINGE DAÑO
        const box = obstacle.boxToCollides()
        if(this.player.collidesWith(box, this.bg.x, this.bg.y)){
          return true
        }else{
          return false
        }
      }  
    })
    if(playerCollidesWithBox){ // SI COLISIONAMOS CON EL, NO ME DEJES AVANZAR
      this.player.x = playerX
      this.player.y = playerY
      this.bg.x = bgX
      this.bg.y = bgY
      this.bg.borderUp = borderUp
      this.bg.borderRight = borderRight
      this.bg.borderDown = borderDown
      this.bg.borderLeft = borderLeft
    }

    //COLISION CON BRAMBLES
    const playerCollidesWithBramble = this.obstacles.some(obstacle => {
      if(obstacle.inflictsDamage === true){ //SI HACE DAÑO DEVUELVE TRUE
        const box = obstacle.boxToCollides()
        if(this.player.collidesWith(box, this.bg.x, this.bg.y)){
          return true
        }else{
          return false
        }
      }
    })
    if(playerCollidesWithBramble){ //SI HACE DAÑO RESTAME 1 A LAS VIDAS DE PLAYER
      this.player.recieveDamage(1)
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  stop() {
  if (this.drawIntervalId !== null) {
    cancelAnimationFrame(this.drawIntervalId)
    this.drawIntervalId = null
    }

    this.bgMusic.pause()
    this.player.walkingAudio.pause()
    this.player.damageAudio.pause()
  }

  gameOver(){
    //window.location.reload()
    const gameOverDiv = document.getElementById("gameOver")
    const gameDiv = document.getElementById("game-div")

    gameOverDiv.style.display = "flex"
    gameDiv.style.display = "none"

    this.defeatAudio.play()
  }

  victory(){
    //window.location.reload()
    const victoryDiv = document.getElementById("victory")
    const gameDiv = document.getElementById("game-div")
    const gamePlay = document.getElementById("gameplay")

    gamePlay.style.display = "none"
    victoryDiv.style.display = "flex"
    gameDiv.style.display = "none"

    this.victoryAudio.play()
  }

  setUpListeners() {
    const upBtn = document.getElementById("up")
    const rightBtn = document.getElementById("right")
    const downBtn = document.getElementById("down")
    const leftBtn = document.getElementById("left")
    const recolectBtn = document.getElementById("recolect")

    addEventListener("keydown", (event) => { //PARA LA JUGABILDAD EN MÓBIL 
      this.player.onKeyEvent(event.code, event.type === "keydown")
    })

    addEventListener("keyup", (event) => {
      this.player.onKeyEvent(event.code, event.type === "keydown")
    })

    upBtn.addEventListener("pointerdown", () => { //CUANDO HACES CLICK EN EL BOTÓN HAZ LO MISMO QUE CON LA TECLA
      this.player.onKeyEvent(KEY_UP, true)
    })
    upBtn.addEventListener("pointerup", () => {
      this.player.onKeyEvent(KEY_UP, false)
    })
    upBtn.addEventListener("pointercancel", () => {
      this.player.onKeyEvent(KEY_UP, false)
    })

    rightBtn.addEventListener("pointerdown", () => {
      this.player.onKeyEvent(KEY_RIGHT, true)
    })
    rightBtn.addEventListener("pointerup", () => {
      this.player.onKeyEvent(KEY_RIGHT, false)
    })
    rightBtn.addEventListener("pointercancel", () => {
      this.player.onKeyEvent(KEY_RIGHT, false)
    })

    downBtn.addEventListener("pointerdown", () => {
      this.player.onKeyEvent(KEY_DOWN, true)
    })
    downBtn.addEventListener("pointerup", () => {
      this.player.onKeyEvent(KEY_DOWN, false)
    })
    downBtn.addEventListener("pointercancel", () => {
      this.player.onKeyEvent(KEY_DOWN, false)
    })

    leftBtn.addEventListener("pointerdown", () => {
      this.player.onKeyEvent(KEY_LEFT, true)
    })
    leftBtn.addEventListener("pointerup", () => {
      this.player.onKeyEvent(KEY_LEFT, false)
    })
    leftBtn.addEventListener("pointercancel", () => {
      this.player.onKeyEvent(KEY_LEFT, false)
    })

    recolectBtn.addEventListener("pointerdown", () => {
      this.player.onKeyEvent(SPACE, true)
    })
    recolectBtn.addEventListener("pointerup", () => {
      this.player.onKeyEvent(SPACE, false)
    })
    recolectBtn.addEventListener("pointercancel", () => {
      this.player.onKeyEvent(SPACE, false)
    })
  }

  createMushrooms() {
    const randomNumberOfTrumpets = Math.floor((Math.random() * 20) + 1)
    let acceptedTrumpets = 0
    for(let i = 0; acceptedTrumpets < randomNumberOfTrumpets && i < 100; i++){ //HACER MÁXIMO 100 INTENTOS PARA CADA GENERACION DE SETA
      const randomX = Math.floor(Math.random() * (this.bg.w - 40))
      const randomY = Math.floor(Math.random() * (this.bg.h - 40))
      const trumpet = new Mushroom(this.ctx, randomX, randomY, 40, 40, TROMPETA, "trompeta", false)
      const collides = this.mushrooms.some(m => m.collidesWith(trumpet)) //SI NO COLISIONAS CON NINGUNA, HAZ PUSH
      if(collides === false){
        this.mushrooms.push(
          trumpet
        )
        acceptedTrumpets++
      }
    }
    this.accepted.trompeta = acceptedTrumpets //ME LO GUARDO EN UN OBJETO PARA LUEGO
    
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
  
  createObstacles() { 
    ROCKS_VARIANTS.forEach(variant => {
      let acceptedRocks = 0
      for(let i = 0; acceptedRocks < 10 && i < 100; i++){
        const randomX = Math.floor(Math.random() * (this.bg.w - 100))
        const randomY = Math.floor(Math.random() * (this.bg.h - 100))
        const rock = new Obstacle(this.ctx, randomX, randomY, variant.colFrame, variant.rowFrame, 100, 100, ROCKS, variant.box)
        
        if(!this.player.collidesWith(rock, this.bg.x, this.bg.y) && !this.mushrooms.some(m => m.collidesWith(rock)) && !this.obstacles.some(o => o.collidesWith(rock))){
          this.obstacles.push(
          rock
          )
          acceptedRocks++
        }
      }
    })

    TREE_VARIANTS.forEach(variant => {
      let acceptedTrees = 0
      for(let i = 0; acceptedTrees < 5 && i < 100; i++){
        const randomX = Math.floor(Math.random() * (this.bg.w - 150))
        const randomY = Math.floor(Math.random() * (this.bg.h - 150))
        const tree = new Obstacle(this.ctx, randomX, randomY, variant.colFrame, variant.rowFrame, 150, 150, TREES, variant.box)
        
        if(!this.player.collidesWith(tree, this.bg.x, this.bg.y) && !this.mushrooms.some(m => m.collidesWith(tree)) && !this.obstacles.some(o => o.collidesWith(tree))){
          this.obstacles.push(
          tree
          )
          acceptedTrees++
        }
      }
    })

    brambleVariants.forEach(variant => {
      let acceptedBrambles = 0
      for(let i = 0; acceptedBrambles < 3 && i < 100; i++){
        const randomX = Math.floor(Math.random() * (this.bg.w - 100))
        const randomY = Math.floor(Math.random() * (this.bg.h - 100))
        const bramble = new Obstacle(this.ctx, randomX, randomY, variant.colFrame, variant.rowFrame, 100, 100, BRAMBLE, variant.box, true)
        
        if(!this.player.collidesWith(bramble, this.bg.x, this.bg.y) && !this.mushrooms.some(m => m.collidesWith(bramble)) && !this.obstacles.some(o => o.collidesWith(bramble))){
          this.obstacles.push(
          bramble
          )
          acceptedBrambles++
        }
      }
    })

    trunkVariants.forEach(variant => {
      let acceptedTrunk = 0
      for(let i = 0; acceptedTrunk < 10 && i < 100; i++){
        const randomX = Math.floor(Math.random() * (this.bg.w - 100))
        const randomY = Math.floor(Math.random() * (this.bg.h - 100))
        const trunk = new Obstacle(this.ctx, randomX, randomY, variant.colFrame, variant.rowFrame, 100, 100, TRUNK, variant.box)
        
        if(!this.player.collidesWith(trunk, this.bg.x, this.bg.y) && !this.mushrooms.some(m => m.collidesWith(trunk)) && !this.obstacles.some(o => o.collidesWith(trunk))){
          this.obstacles.push(
          trunk         
         )
          acceptedTrunk++
        }
      }
    })
  }

  recolectMushroom() {
    const collidesWithMushroom = this.mushrooms.some(mushroom => this.player.collidesWith(mushroom, this.bg.x, this.bg.y))
    if(this.player.collectPressed && collidesWithMushroom){ //SI COLISIONAS Y MANTIENES ESPACIO

      if(this.isRecolecting === false){ //SI NO ESTAS RECOLECTANDO

        this.recolectingAudio.play() 
        this.isRecolecting = true //INICIALIZA LA RECOGIDA
        this.animateFrames = ANIMATE_TIME //INICIALIZA EL CONTADOR DEL SPRITE
        this.mushroomCollided = this.mushrooms.find(mushroom => { //ENCUENTRA EL MUSHROOM COLISIONADO
          if(this.player.collidesWith(mushroom, this.bg.x, this.bg.y)){
            return mushroom //DEVUÉLVELO
          }
        })
      }else{ //SI YA ESTAS RECOLECTANDO
        if(this.player.collidesWith(this.mushroomCollided, this.bg.x, this.bg.y)){ //Y ES EL QUE HABÍAS COLISIONADO
          this.animateFrames-- //RESTALE 1 AL CONTADOR DEL SPRITE
          if(this.animateFrames === 0){ //MIRAR QUE TIPO DE SETA HA RECOGIDO Y HACER LO QUE CORRESPONDA
            if(this.mushroomCollided.type === "cep"){
              this.recolectedAudio.play()
              this.inventory.cep += 1
            }
            if(this.mushroomCollided.type === "reig"){
              this.recolectedAudio.play()
              this.inventory.reig += 1
            }
            if(this.mushroomCollided.type === "rossinyol"){
              this.recolectedAudio.play()
              this.inventory.rossinyol += 1
            }
            if(this.mushroomCollided.type === "rovello"){
              this.recolectedAudio.play()
              this.inventory.rovello += 1
            }
            if(this.mushroomCollided.type === "trompeta"){
              this.recolectedAudio.play()
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
            this.mushrooms = this.mushrooms.filter(mush => { //LO ELIMINAMOS DE LA LISTA CON UN FILTER
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
      this.recolectingAudio.pause()
      this.recolectingAudio.currentTime = 0
    }
  }

  mushroomsCounter() {
    const cepCounter = document.getElementById("cep_counter")
    const reigCounter = document.getElementById("ouDeReig_counter")
    const rossinyolsCounter = document.getElementById("rossinyols_counter")
    const rovelloCounter = document.getElementById("rovello_counter")
    const trompetaCounter = document.getElementById("trompeta_counter")

    if(this.inventory.cep !== 0){
      cepCounter.parentElement.style.display = "flex"
    }

    if(this.inventory.reig !== 0){
      reigCounter.parentElement.style.display = "flex"
    }

    if(this.inventory.rossinyol !== 0){
      rossinyolsCounter.parentElement.style.display = "flex"
    }

    if(this.inventory.rovello !== 0){
      rovelloCounter.parentElement.style.display = "flex"
    }

    if(this.inventory.trompeta !== 0){
      trompetaCounter.parentElement.style.display = "flex"
    }

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
    if(this.player.lives <= 0){ //DERROTA CUANDO PIERDES TODAS LAS VIDAS
      return "defeat"
    }
    if(this.mushroomsCreated){ //VICTÓRIA CUANDO RECOGES TODAS LAS SETAS
      if((this.inventory.cep === 1) && 
      (this.inventory.reig === this.accepted.reig) && 
      (this.inventory.rossinyol === this.accepted.rossinyol) &&
      (this.inventory.rovello === this.accepted.rovello) &&
      (this.inventory.trompeta === this.accepted.trompeta)){
        return "victory"
      }
    }

    return null
  }
}