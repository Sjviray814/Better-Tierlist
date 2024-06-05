let imageSize = 65;
class imageElement{
    constructor(src, x=0, y=0){
        this.image = new Image();
		this.image.src = src;
        this.src = src
        this.x = x;
        this.y = y;
        this.moving = false;
        this.size = imageSize;
    }
    draw(){
        //this.image.onload = function(){
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        //}
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
        const index = imageElements.findIndex(img => {
            return img.src === this.src;
        });
            imageElements.splice(index, 1);
    }
    move(){
        if(this.moving){
            this.x = mX - this.size/2;
            this.y = mY - this.size/2;
        }
    }
    
}