document.addEventListener("DOMContentLoaded", () => {
  const startDiv = document.getElementById("start")
  const gameDiv = document.getElementById("game-div")
  const startBtn = document.getElementById("start-btn")
  const playAgainBtn = document.getElementById("playAgain-btn-gameover")
  const playAgainBtnVictory = document.getElementById("playAgain-btn-victory")
  const victoryDiv = document.getElementById("victory")
  const gameOverDiv = document.getElementById("gameOver")

  
  startBtn.addEventListener("click", () => {
    const game = new Game("game")
    game.start()
    startDiv.style.display = "none"
    gameDiv.style.display = "flex"
  })

  playAgainBtn.addEventListener("click", () => {
    gameOverDiv.style.display = "none"
    gameDiv.style.display = "flex"
    const game = new Game("game")
    game.start()
  })

  playAgainBtnVictory.addEventListener("click", () => {
    victoryDiv.style.display = "none"
    gameDiv.style.display = "flex"
    const game = new Game("game")
    game.start()
  })
})