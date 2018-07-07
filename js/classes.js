class Entity {
  constructor () {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83); //101&83 is hard coding the off-set
  }
}

class Player extends Entity {
  constructor () {
    super ();
    this.sprite += 'char-princess-girl.png';
  }
}
