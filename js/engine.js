
var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    $('.popRestart').click(reset);
    $('.restart').click(reset);


    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions() {
      allEnemies.forEach(enemy => {
        if(enemy.checkCollisions(player) || player.checkCollisions(enemy)) {
          player.y = 5;
          player.x = 2;
        }
      });
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        var rowImages = [
                'images/clear-block.png',   // Blank Space
                'images/clear-block.png',   // Blank Space
                'images/clear-block.png',   // Blank Space
                'images/clear-block.png',   // Blank Space
                'images/clear-block.png',   // Blank Space
                'images/clear-block.png'    // Blank Space
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {
        console.log('engine reset');

        player.x = 2;
        player.y = 5;

        // return reset;
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/clear-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-princess-girl.png',
        'images/hero.png',
        'images/enemy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
