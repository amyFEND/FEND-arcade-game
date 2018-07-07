const player = new Player();

const allEnemies = [...Array(3)].map((_,i)=> new Enemy(0,i+1));



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',     // left arrow
        38: 'up',       // up arrow
        39: 'right',    // right arrow
        40: 'down',     // down arrow
        65: 'left',     // A
        87: 'up',       // W
        68: 'right',    // D
        83: 'down'      // S
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
