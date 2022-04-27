let imageSize = 90;
class imageElement{
    constructor(src){
        this.image = new Image();
		this.image.src = src;
        this.x = 0;
        this.y = 0;
        this.moving = false;
        this.size = imageSize;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
    clicked(clickX, clickY){
        if(!this.moving){
            if(clickX > this.x && clickX < this.x + this.size && clickY > this.y && clickY < this.y + this.size){
                this.moving = true;
                this.size = imageSize + 10;
            }
        }
        else if(this.moving){
                this.moving = false;
                this.size = imageSize;
            
        }
    
    }
    delete(){
        imageElements.splice(imageElements.indexOf(this.src), 1);
    }
    move(){
        if(this.moving){
            this.x = mX - this.size/2;
            this.y = mY - this.size/2;
        }
    }
    
}