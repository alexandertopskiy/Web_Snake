var intervalId, speed = 5;
    px = py = 10;
    gs = tc = 20;
    ax = ay = 15;
    xv = yv = 0;
    trail = [];
    tail = 1;
    score = bestScore = 0;

window.onload=function() {
    canv = document.getElementById("snake");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    intervalId = setInterval(game, 1000/speed);  
}

function gameover() {
    
    speed = 5; score = 0;
    px = py = 10;
    gs = tc = 20;
    ax = ay = 15;
    xv = yv = 0;
    trail = [];
    tail = 1;
    
    //удаление змейки
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width, canv.height);
    
    ctx.font = "40px Tahoma"; // Назначаем размер и шрифт текста
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", 200, 200); // Increase and draw score
    ctx.font = "20px Tahoma"; // Назначаем размер и шрифт текста
    ctx.fillText("PRESS ENTER TO RESTART", 200, 250); // Increase and draw score
    clearTimeout(intervalId);
    document.removeEventListener("keydown", keyPush);
    document.addEventListener("keydown", keyPushGameOver);
    console.log("Game Over");
}

function game () {
    isGameOver = 0;
    document.removeEventListener("keydown", keyPushGameOver);
    px+=xv;
    py+=yv;
    if(px<0)  px = tc-1;
    if(px>tc-1)  px = 0;
    if(py<0)  py = tc-1;
    if(py>tc-1)  py = 0;

    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width, canv.height);

    ctx.font = "10px Tahoma"; // Назначаем размер и шрифт текста
    ctx.fillStyle = "white";
    ctx.textAlign = "left"
    // ctx.fillText(`Ваш счет: ${score}`, 9, 25); // Increase and draw score
    // ctx.fillText(`Рекорд: ${bestScore}`, 9, 50); // Draw best score

    //отрисовка змейки
    for (var i=0; i<trail.length; i++) {
        
        if (trail[i].x == px && trail[i].y == py && tail > 1) {
            gameover();
            return false;
        }
        if (i == trail.length - 1) {
            ctx.fillStyle="brown";
            ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
        }
        else {
            ctx.fillStyle="green";
            ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-1, gs-2);
        }
        ctx.fillStyle = "white";
        ctx.fillText(`Ваш счет: ${score}`, 9, 25); // Increase and draw score
        ctx.fillText(`Рекорд: ${bestScore}`, 9, 50); // Draw best score
    }

    trail.push({x:px, y:py});
    while(trail.length >tail) 
        trail.shift();

    // змейка скушала фрукт
    if (ax==px && ay==py) {
        tail++;
        console.log("tail: ", tail);
        if (tail % 5 == 0)
            speed += 2;
        score += 10;
        console.log("speed: ", speed);
        clearInterval(intervalId);
        intervalId = setInterval(game, 1000/speed);
        ctx.font = "10px Tahoma"; // Назначаем размер и шрифт текста
        ctx.fillStyle = "white";
        ctx.textAlign = "left"
        bestScore = bestScore < score ? score : bestScore; // New best score?
        ax = Math.floor(Math.random()*tc);
        ay = Math.floor(Math.random()*tc);
    }

    //отрисовка фрукта
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);

}

//обработчик нажатия клавиш
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37: //влево
            xv=-1; yv=0;
            break;
        case 38: //вверх
            xv=0; yv=-1;
            break;
        case 39: //вправо
            xv=1; yv=0;
            break;
        case 40: //вниз
            xv=0; yv=1;
            break;
        case 32 : //пробел
            console.log("space");
            speed += 1;
            clearInterval(intervalId);
            intervalId = setInterval(game, 1000/speed);
            break;
    }
}

//обработчик нажатия клавиши Enter для возобновления игры
function keyPushGameOver(evt) {
    switch(evt.keyCode) {
        case 13 :
            document.addEventListener("keydown", keyPush);
            intervalId = setInterval(game, 1000/speed);
            break;
    }
}