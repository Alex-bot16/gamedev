let playerelement;
let groundelement;
let groundRect;
let enemyelement;


/*
let blockelement;
let blockRect;

*/


function startgame(){
    console.log("Start Activated");

    playerelement = document.querySelector('.main');
    groundelement = document.querySelector('.ground');
    groundRect = groundelement.getBoundingClientRect();

    enemyelement = document.querySelector('.enemy');
    /*
    //individual blocks
    blockelement = document.querySelector('#BLOCK');
    blockRect = blockelement.getBoundingClientRect();

    */

    /*
    enemy.x =....
    enemy.y=....
    enemy.width=...


    */

    enemy = {
        x: parseInt(enemyelement.style.left, 10) || 0,
        y: parseInt(enemyelement.style.top, 10) || 0,
        width: enemyelement.offsetWidth,
        height: enemyelement.offsetHeight,
    }

    player = {
        x: parseInt(playerelement.style.left, 10) || 0,
        y: parseInt(playerelement.style.top, 10) || 0,
        width: playerelement.offsetWidth,
        height: playerelement.offsetHeight,
        vy: 0,
        gravity: 1,
        jumpstrength: -20,
        vx:0,
        friction: 1,
        leapstrength:20, //change if left or right

        leapleft: false,
        leftright: false, 
        leaping: false,
        onGround: true,
    }

    ground = {
        x: groundRect.left,
        y: groundRect.top,
    }
/*
    block = {
        x: blockRect.left,
        y: blockRect.top,
    }
    */





    checkKeyPress();
    requestAnimationFrame(updategame);


}
function updategame(){

    updateplayer();
    requestAnimationFrame(updategame);
}
function updateplayer(){

    /// Jumping /////
    if(!player.onGround){
        player.vy+=player.gravity;
        player.y+=player.vy;

        if(player.y>=ground.y-player.height){
            player.y = ground.y - player.height;
            player.onGround = true;
            player.vy=0;
    
        }

        /*
        //applying the same code for block elements
        let withinXBounds = player.x < (block.x + blockelement.offsetWidth) && (player.x + player.width) > block.x;
        let withinYBounds = player.y >= (block.y - player.height) && player.y < block.y;

        if (withinXBounds && withinYBounds){
            player.y = block.y -player.height;
            player.onGround = true;
            player.vy=0;
        }
        else {
            player.onGround = false;
        }

        */

        playerelement.style.top = player.y + 'px';
    }
    ////
    if(player.leaping){
        console.log("player leaping");
        if(player.vx == 0){
            player.leaping = false;
        }   
        else if (player.vx<0){
            //therefore player is moving left
            //friction positive
            player.vx+=player.friction;
            //console.log("horiz velocity left"+player.vx);
        }
        else if (player.vx>0){
            player.vx-=player.friction;
            //console.log("horiz velocity right"+player.vx);
            //player is moving right
            //friction negative
        }

        player.x+=player.vx;
        console.log("after application"+player.vx);


    }
    playerelement.style.left = player.x + 'px';

}

function jump(){
    if(player.onGround){
        player.vy = player.jumpstrength;
        player.onGround = false;
    }
}

function horizpress(){
if(player.leapleft){
    player.vx=-(player.leapstrength);
    player.leapleft=false;
}
else if(player.leapright){
    player.vx=player.leapstrength;
    player.leapright=false;
}
player.leaping=true; //holds when vx is greater than 0

}

function checkKeyPress(){
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowLeft': // Move left
                player.leapleft=true;
                horizpress();
                break;
            case 'ArrowRight': // Move right
                player.leapright=true;
                horizpress();
                break;
            case 'ArrowUp':
                console.log("arrowkey pressed");
                jump();
                break;
        }
        playerelement.style.left = player.x + 'px';
    });

}

