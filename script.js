let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let images = [];
let imageElements = [];
let tiers = [];
let mX, mY;
let regex = /(https?:\/\/.*\.(?:png|jpg))/ ///.*/ // uncomment to find only jpg or png: /(https?:\/\/.*\.(?:png|jpg))/


function createTier(){
    tiers.push(new tier(document.getElementById("color").value, document.getElementById("tierName").value));
}
    
window.onload = function() { 
    images.forEach(imgSrc =>{
        imageElements.push(new imageElement(imgSrc));
    });
    originalLayout();
    let framesPerSecond = 100;
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
        imageElements.forEach(img => {
            if(img.moving) img.delete();
        });
        tiers.forEach(tier =>{
            if(tier.moving) tier.delete();
        })
    }
})

document.addEventListener("keyup", e => {
    keyUp = e.code;
    if(keyUp == "Enter") getText();
});
function getText(){
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


function save(){
    localStorage.clear();
    if(confirm("Do you want to save this list? This will override previously saved lists.")){
        tiers.forEach(tier =>{
            window.localStorage.setItem("111" + tier.name, JSON.stringify(tier));
        });
        images.forEach(image =>{
            window.localStorage.setItem("222" + image, image);
        });
        imageElements.forEach(elem =>{
            window.localStorage.setItem("333" + elem.src, JSON.stringify(elem));
        });
    }
}

function load(){
    if(confirm("Do you want to load your saved list?")){
        tiers = [];
        images = [];
        imageElements = [];
        Object.keys(localStorage).forEach(function(key){
            let element = localStorage.getItem(key);
            let parsed = JSON.parse(element);
            if(key[0] == "1") tiers.push(new tier(parsed.color, parsed.name, parsed.x, parsed.y));
            if(key[0] == "2") images.push(element);
            if(key[0] == "3") imageElements.push(new imageElement(parsed.src, parsed.x, parsed.y));
         });
        // tiers = JSON.parse(localStorage.getItem("tiers") || "[]");
        // images = JSON.parse(localStorage.getItem("images") || "[]");
        // imageElements = JSON.parse(localStorage.getItem("imageElements") || "[]");
    }
}

function clear(){
    if(confirm("Do you want to clear your tiers and images?")){
        tiers = [];
        images = [];
        imageElements = [];
    }
}

function reset(){
    if(confirm("Do you want to reset to default?")){
        tiers = [];
        images = [];
        imageElements = [];
        originalLayout();
    }
}

function getArr(){
    let arr = [];
    tiers.forEach(tier =>{
        arr.push(tier.color, tier.name, tier.x, tier.y);
    });
    imageElements.forEach(elem =>{
        arr.push(elem.src, elem.x, elem.y);
    });
    console.log(arr);
}

function loadFromArr(arr){
    imageElements = [];
    tiers = [];
    for(let i = 0; i<arr.length; i++){
        if(typeof arr[i] == "string"){
            if(typeof arr[i+1] == "string"){
                tiers.push(new tier(arr[i], arr[i+1], arr[i+2], arr[i+3]));
            }
            else if(regex.test(arr[i])){
                imageElements.push(new imageElement(arr[i], arr[i+1], arr[i+2]));
            }
        }
    }
}