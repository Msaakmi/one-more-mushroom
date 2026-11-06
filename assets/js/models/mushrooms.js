class Mushroom {
  constructor(ctx, x, y, w, h, src, isPoisonous = false) {
    this.ctx = ctx

    this.x = x
    this.y = y

    this.w = w
    this.h = h

    this.isPoisonous = isPoisonous

    this.image = new Image()

    this.image.onload = () => {
      this.image.isReady = true
    }

    this.image.src = src
  }

  draw(bgX, bgY) {
    if(this.image.isReady) {
      this.ctx.drawImage(
        this.image,
        this.x + bgX,
        this.y + bgY,
        this.w,
        this.h
      )
    }
  }

  collidesWith(element) {
    return (this.x + this.w > element.x) &&
    (this.x < element.x + element.w) &&
    (this.y + this.h > element.y) &&
    (this.y < element.y + element.h)
  }
}