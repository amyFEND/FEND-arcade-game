/**
 * @class
 * @classdesc Super class for all movable/interacting objects on the board
 */
class Entity {
  constructor () {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  update (dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutofBoundsY = this.y < 1;
  }



  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) { /* can change 0.5 (block) size to increase/decrease sensitivity */
        return true;
      }
    }
    else {
      return false;
    }
  }
}

/**
 * @class
 * @classdesc All properties and behavior of game player
 * @extends Entity
 */
class Player extends Entity {
  constructor () {
    super ();
    this.sprite += 'hero.png';
    this.moving = false;
    this.win = false;
  }

  update(dt) {
    super.update();
    if (this.isOutofBoundsY && !this.moving && !this.win) {
      alert('Win!');
      this.win = true;
    }
  }

  render() {
    this.moving = false;
    ctx.drawImage(Resources.get(this.sprite), this.x * 109, this.y * 100);
  }

  handleInput(input) {
    switch (input) {
      case 'left':
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'down':
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
    }
    this.moving = true;
  }
}


/**
 * @class
 * @classdesc All properties and behavior of game enemies
 * @extends Entity
 */
class Enemy extends Entity {
  constructor (x, y) {
    super ();
    this.sprite += 'enemy.png';
    this.x = Math.random(x);
    this.y = y;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 106, this.y * 105);
  }

  update (dt) {
    super.update();
    if (this.isOutOfBoundsX) {
      this.x = -1;
    }
    else {
      this.x += Math.random(dt) / 10;
    }
  }
}
