document.addEventListener("DOMContentLoaded", () => {
  const game = new Game("game")
  game.start()
  window.game = game
})