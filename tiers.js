let tierSize = 80;
class tier{
    constructor(color, name, x = 0, y = 0){
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = name
        this.moving = false;
        this.size = tierSize;
    }
    draw(){
        create(this.x, this.y, this.size, this.size, this.color);
        ctx.font='20px serif';
        ctx.fillStyle='black';		 
		ctx.fillText(this.name, this.x+this.size/2 - (5*this.name.length), this.y+this.size/2+3); 
    }
    clicked(clickX, clickY){
        if(!this.moving){
            if(clickX > this.x && clickX < this.x + this.size && clickY > this.y && clickY < this.y + this.size){
                this.moving = true;
                this.size = tierSize + 10;
            }
        }
        else if(this.moving){
                this.moving = false;
                this.size = tierSize;
            
        }
    
    }
    delete(){
        const index = tiers.findIndex(tier => {
            return tier.name === this.name;
        });
            tiers.splice(index, 1);
    }
    move(){
        if(this.moving){
            this.x = mX - this.size/2;
            this.y = mY - this.size/2;
        }
    }
    
}