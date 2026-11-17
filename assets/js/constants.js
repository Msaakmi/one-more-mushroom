//COMMON CONSTANTS
const VX = 5
const LIMIT_X = 100
const LIMIT_Y = 120
const KEY_UP = "ArrowUp"
const KEY_RIGHT = "ArrowRight"
const KEY_DOWN = "ArrowDown"
const KEY_LEFT = "ArrowLeft"
const SPACE = "Space"

//BACKGROUND
const BG_SRC = "assets/img/bg.jpg"

// GAME
const GAME_FPS = 1000 / 60
const CANVAS_W = 350
const CANVAS_H = 460

//HEARTS
const PLAYER_HEARTS = "assets/img/heart.png"
const HEARTS_W = 24
const HEARTS_H = 24

// PLAYER
const PLAYER_IMG_DOWN = "assets/img/player/player_down.png"
const PLAYER_IMG_RIGHT = "assets/img/player/player_rigth.png"
const PLAYER_IMG_LEFT = "assets/img/player/player_left.png"
const PLAYER_IMG_UP = "assets/img/player/player_up.png"
const PLAYER_W = 50
const PLAYER_H = 65
const ANIMATE_TIME = 90
const LIVES = 5

// MUSHROOMS
const ROVELLO = "assets/img/mushrooms/rovello.png"
const OU_DE_REIG = "assets/img/mushrooms/ouDeReig.png"
const CEP = "assets/img/mushrooms/cep.png"
const POISONOUS1 = "assets/img/mushrooms/amanitaMuscaria.png"
const POISONOUS2 = "assets/img/mushrooms/dolent.png"
const ROSSINYOLS = "assets/img/mushrooms/rossinyols.png"
const TROMPETA = "assets/img/mushrooms/trompeta.png"
const MUSHROOM_SRC = "assets/img/mushrooms/amanitaMuscaria.png"
const GOLD_MUSHROOM = "assets/img/mushrooms/gold-mushroom.png"

// OBSTACLES
const ROCKS = "assets/img/obstacles/rocks.png"
const BRAMBLE = "assets/img/obstacles/bramble.png"
const TREES = "assets/img/obstacles/trees.png"
const TRUNK = "assets/img/obstacles/trunk.png"

// ROCKS
const COLLIDES_BOX_ROCKS = {
  rock1: {
  offsetX: 40,
  offsetY: 55,
  w: 30,
  h: 25
  },
  rock2: {
    offsetX: 35,
    offsetY: 45,
    w: 30,
    h: 35
  },
  rock3: {
    offsetX: 20,
    offsetY: 65,
    w: 60,
    h: 15
  },
  rock4: {
    offsetX: 30,
    offsetY: 35,
    w: 40,
    h: 45
  },
  rock6: {
    offsetX: 35,
    offsetY: 50,
    w: 35,
    h: 30
  }
}

const ROCKS_VARIANTS = [
  {
    colFrame: 0,
    rowFrame: 0,
    box: COLLIDES_BOX_ROCKS.rock1
  },
  {
    colFrame: 1,
    rowFrame: 0,
    box: COLLIDES_BOX_ROCKS.rock2
  },
  {
    colFrame: 2,
    rowFrame: 0,
    box: COLLIDES_BOX_ROCKS.rock3
  },
  {
    colFrame: 0,
    rowFrame: 1,
    box: COLLIDES_BOX_ROCKS.rock4
  },
  {
    colFrame: 1,
    rowFrame: 1,
    box: COLLIDES_BOX_ROCKS.rock4
  },
  {
    colFrame: 2,
    rowFrame: 1,
    box: COLLIDES_BOX_ROCKS.rock6
  }
]

//TREES
const COLLIDES_BOX_TREES = {
  tree1: {
  offsetX: 50,
  offsetY: 55,
  w: 50,
  h: 65
  },
  tree2: {
    offsetX: 66,
    offsetY: 65,
    w: 23,
    h: 65
  },
  tree3: {
    offsetX: 50,
    offsetY: 65,
    w: 30,
    h: 55
  },
  tree4: {
    offsetX: 55,
    offsetY: 55,
    w: 30,
    h: 73
  },
  tree5: {
    offsetX: 60,
    offsetY: 55,
    w: 40,
    h: 73
  },
  tree6: {
    offsetX: 45,
    offsetY: 60,
    w: 55,
    h: 60
  }
} 

const TREE_VARIANTS = [
  {
    colFrame: 0,
    rowFrame: 0,
    box: COLLIDES_BOX_TREES.tree1
  },
  {
    colFrame: 1,
    rowFrame: 0,
    box: COLLIDES_BOX_TREES.tree2
  },
  {
    colFrame: 2,
    rowFrame: 0,
    box: COLLIDES_BOX_TREES.tree3
  },
  {
    colFrame: 0,
    rowFrame: 1,
    box: COLLIDES_BOX_TREES.tree4
  },
  {
    colFrame: 1,
    rowFrame: 1,
    box: COLLIDES_BOX_TREES.tree5
  },
  {
    colFrame: 2,
    rowFrame: 1,
    box: COLLIDES_BOX_TREES.tree6
  }
]

//BRAMBLES
const COLLIDES_BOX_BRAMBLES = {
  bramble1: {
  offsetX: 25,
  offsetY: 25,
  w: 50,
  h: 50
  },
  bramble2: {
    offsetX: 25,
    offsetY: 25,
    w: 40,
    h: 60
  },
  bramble3: {
    offsetX: 20,
    offsetY: 35,
    w: 60,
    h: 45
  },
  bramble4: {
    offsetX: 10,
    offsetY: 35,
    w: 80,
    h: 45
  },
  bramble5: {
    offsetX: 20,
    offsetY: 45,
    w: 70,
    h: 20
  },
  bramble6: {
    offsetX: 20,
    offsetY: 40,
    w: 45,
    h: 50
  }
} 

const BRAMBLE_VARIANTS = [
  {
    colFrame: 0,
    rowFrame: 0,
    box: COLLIDES_BOX_BRAMBLES.bramble1
  },
  {
    colFrame: 1,
    rowFrame: 0,
    box: COLLIDES_BOX_BRAMBLES.bramble2
  },
  {
    colFrame: 1,
    rowFrame: 1,
    box: COLLIDES_BOX_BRAMBLES.bramble3
  },
  {
    colFrame: 2,
    rowFrame: 1,
    box: COLLIDES_BOX_BRAMBLES.bramble4
  },
  {
    colFrame: 2,
    rowFrame: 0,
    box: COLLIDES_BOX_BRAMBLES.bramble5
  },
  {
    colFrame: 0,
    rowFrame: 1,
    box: COLLIDES_BOX_BRAMBLES.bramble6
  }
]

//TRUNKS
const COLLIDES_BOX_TRUNK = {
  offsetX: 25,
  offsetY: 45,
  w: 60,
  h: 25
} 

const TRUNK_VARIANTS = [
  {
    colFrame: 0,
    rowFrame: 0,
    box: COLLIDES_BOX_TRUNK
  },
  {
    colFrame: 1,
    rowFrame: 0,
    box: COLLIDES_BOX_TRUNK
  },
  {
    colFrame: 2,
    rowFrame: 0,
    box: COLLIDES_BOX_TRUNK
  },
  {
    colFrame: 0,
    rowFrame: 1,
    box: COLLIDES_BOX_TRUNK
  },
  {
    colFrame: 1,
    rowFrame: 1,
    box: COLLIDES_BOX_TRUNK
  },
  {
    colFrame: 2,
    rowFrame: 1,
    box: COLLIDES_BOX_TRUNK
  }
]

