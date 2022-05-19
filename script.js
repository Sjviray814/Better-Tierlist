let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let images = [];
let imageElements = [];
let tiers = [];
let mX, mY;
let regex = /(https?:\/\/.*\.(?:png|jpg))/ ///.*/ // uncomment to find only jpg or png: /(https?:\/\/.*\.(?:png|jpg))/
let saveName = document.getElementById('saveName');


function createTier(){
    tiers.push(new tier(document.getElementById("color").value, document.getElementById("tierName").value));
}
    
window.onload = function() { 
    images.forEach(imgSrc =>{
        imageElements.push(new imageElement(imgSrc));
    });
    originalLayout();
    updateChoices();
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
    if(regex.test(text) || text.includes("jpeg")) {
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

function updateChoices(){
    let saves = document.getElementById("saves");
    saves.innerText = null;
    Object.keys(localStorage).forEach(function(key){
        let option = document.createElement('option');
        option.text = option.value = key;
        saves.add(option, 0);
    });
}

function save(){
    if(confirm("Do you want to save this list?")){
        let arr = [];
        tiers.forEach(tier =>{
            arr.push(tier.color, tier.name, tier.x, tier.y);
        });
        imageElements.forEach(elem =>{
            arr.push(elem.src, elem.x, elem.y);
        });
        window.localStorage.setItem(document.getElementById("saveName").value, arr.join("|||"));
    }
    updateChoices();
}

function clearAll(){
    window.localStorage.clear();
}

function load(){
    if(confirm("Do you want to load this saved list?")){
        tiers = [];
        images = [];
        imageElements = [];
        let selected = document.getElementById('saves').value;
        let str = window.localStorage.getItem(selected);
        let arr = str.split("|||");
        for(let i = 0; i<arr.length; i++){
            if(typeof arr[i] == "string" && !parseInt(arr[i])){
                if(!parseInt(arr[i]) && !parseInt(arr[i+1])){
                    tiers.push(new tier(arr[i], arr[i+1], parseInt(arr[i+2]), parseInt(arr[i+3])));
                }
                else if(!parseInt(arr[i]) && parseInt(arr[i+1] && parseInt(arr[i-1]))){
                    imageElements.push(new imageElement(arr[i], parseInt(arr[i+1]), parseInt(arr[i+2])));
                }
            }
        }
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

function copy(){
    let selected = document.getElementById('saves').value;
    let str = window.localStorage.getItem(selected);
    document.getElementById('saveName').value = str;
}

function bigLoad(str){
    let arr = str.split("|||");
        for(let i = 0; i<arr.length; i++){
            if(typeof arr[i] == "string" && !parseInt(arr[i])){
                if(!parseInt(arr[i]) && !parseInt(arr[i+1])){
                    tiers.push(new tier(arr[i], arr[i+1], parseInt(arr[i+2]), parseInt(arr[i+3])));
                }
                else if(!parseInt(arr[i]) && parseInt(arr[i+1] && parseInt(arr[i-1]))){
                    imageElements.push(new imageElement(arr[i], parseInt(arr[i+1]), parseInt(arr[i+2])));
                }
            }
        }
}

function erase(){
    if(confirm("Do you want to erase this list?")){
        let selected = document.getElementById('saves').value;
        window.localStorage.removeItem(selected);
        window.location.reload();
    }
}
