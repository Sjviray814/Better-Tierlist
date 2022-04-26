let imageSize = 90;
class imageElement{
    constructor(src){
        this.image = new Image();
		this.image.src = src;
        this.x = 0;
        this.y = 0;
        this.moving = false;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, imageSize, imageSize);
    }
    clicked(clickX, clickY){
        if(!this.moving){
            if(clickX > this.x && clickX < this.x + imageSize && clickY > this.y && clickY < this.y + imageSize){
                this.moving = true;
                console.log(this.moving);
            }
        }
        else if(this.moving){
            if(clickX > this.x && clickX < this.x + imageSize && clickY > this.y && clickY < this.y + imageSize){
                this.moving = false;
            }
        }
    
    }
    move(){
        if(this.moving){
            this.x = mX - imageSize/2;
            this.y = mY - imageSize/2;
        }
    }
    
}