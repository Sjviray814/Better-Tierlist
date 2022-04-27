let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let images = [
    'https://i1.sndcdn.com/artworks-000412038030-h21ujs-t500x500.jpg'
];
let imageElements = [];
let tiers = [];
let mX, mY;

function createTier(){
    tiers.push(new tier(document.getElementById("color").value, document.getElementById("tierName").value));
}
    
window.onload = function() { 
    images.forEach(imgSrc =>{
        imageElements.push(new imageElement(imgSrc));
    });
    let framesPerSecond = 100
    setInterval(doBoth, 1000/framesPerSecond);
}

window.onclick = function(e){
    imageElements.forEach(img =>{
        img.clicked(e.pageX, e.pageY);
    });
    tiers.forEach(tier =>{
        tier.clicked(e.pageX, e.pageY);
    })

}

window.onmousemove = function(e){
    mX = e.pageX;
    mY = e.pageY;
}

document.addEventListener("keydown", e => {
    keyDown = e.code; 
    if(keyDown == 'Backspace'){
        for(let img of imageElements){
            if(img.moving) img.delete();
        }
        for(let tier of tiers){
            if(tier.moving) tier.delete();
        }
    }
})

document.addEventListener("keyup", e => {
    keyUp = e.code;
    if(keyUp == "Enter") getText();
});
function getText(){
    let regex = /.*/ // uncomment to find only jpg or png: /(https?:\/\/.*\.(?:png|jpg))/
    let text = document.getElementById("box").value;
    if(regex.test(text)) {
        document.getElementById("box").value = "";
        imageElements.push(new imageElement(text));
    }
}


function drawEverything(){
    create(0, 0, canvas.width, canvas.height, 'black');
    imageElements.forEach(img =>{
        img.draw();
    });
    tiers.forEach(tier =>{
        tier.draw();
    });
}
function moveEverything(){
    imageElements.forEach(img =>{
        img.move();
    });
    tiers.forEach(tier =>{
        tier.move();
    });
}

function doBoth(){
    drawEverything();
    moveEverything();
}

function create(x, y, width, height, color){
    ctx.fillStyle=color;
    ctx.fillRect(x, y, width, height);
  }

