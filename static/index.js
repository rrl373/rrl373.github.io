import platform from '../img/platform7.png'

//var main = document.getElementById("canvas");
//    main.style.top = "56px";
//    main.style.position = "absolute";
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
function resize(){
    var height = window.innerHeight
    height -= 76
    canvas.height = height
    var width = window.innerWidth
    canvas.width = width
}
resize()

const gravity = 0.5

class Player{
    //Position
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
    }
    //Print Character 
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 
            this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }

}

//Platform
class Platform{
    constructor({x,y, image}){
        this.position = {
            x:x,
            y:y,
            image:''
        }
        this.width = 200
        this.height = 20
        this.image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


//Create obj.
const image = new Image()
image.src = platform
console.log(image)
const platforms = [new Platform({x: 200, y: 100, image}), 
    new Platform({x: 500, y: 400, image})]
const player = new Player()
const keyUsed = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

//movement
window.addEventListener('keydown', (e) =>{
    console.log(e.key)
    switch(e.key){
        case 'a':
        case 'ArrowLeft':
            console.log('left')
            keyUsed.left.pressed = true
            break
        case 'd':
        case 'ArrowRight':
            console.log('right')
            keyUsed.right.pressed = true
                break
        case 'w':
        case 'ArrowUp':
            console.log('up')
            player.velocity.y -= 15
            break
        case 's':
        case 'ArrowDown':
            console.log('down')
            break
    }
    console.log(keyUsed.right.pressed)
});

window.addEventListener('keyup', (e) =>{
    console.log(e.key)
    switch(e.key){
        case 'a':
        case 'ArrowLeft':
            console.log('left')
            keyUsed.left.pressed = false
                break
        case 'd':
        case 'ArrowRight':
            console.log('right')
            keyUsed.right.pressed = false
                break
        case 'w':
            case 'ArrowUp':
                console.log('up')
                player.velocity.y -= 20
                    break
        case 's':
        case 'ArrowDown':
            console.log('down')
                break
    }
    console.log(keyUsed.right.pressed)
});

let scrollOffset = 0
//Animate movement
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    //Move & Limit Player Movement
    if(keyUsed.right.pressed && player.position.x < 400){
        player.velocity.x = 5
    }else if(keyUsed.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }else{
        player.velocity.x = 0
        //Player movement limit reached 
        if(keyUsed.right.pressed){
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        }else if(keyUsed.left.pressed){
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }

    //Platform Collision
    platforms.forEach(platform => {
    if( //Get on Plaform
       (player.position.y + player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y) && 
        //Fall of Platform (L & R)
        (player.position.x + player.width >= platform.position.x) &&
        (player.position.x + player.width <= platform.position.x + platform.width)){
            player.velocity.y = 0
        }
    })
    
    if(scrollOffset > 2000)
        console.log('Winner winner')
}

animate()