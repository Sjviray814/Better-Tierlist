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
        ctx.fillStyle='black';

        ctx.font='22px serif';	 
        if(ctx.measureText(this.name).width >= this.size - 10){
            ctx.font='20px serif';	
        }
        if(ctx.measureText(this.name).width >= this.size - 10){
            ctx.font='18px serif';	
        }
        if(ctx.measureText(this.name).width >= this.size - 10){
            ctx.font='16px serif';	
        }
        if(ctx.measureText(this.name).width >= this.size - 10){
            ctx.font='14px serif';	
        }
        if(ctx.measureText(this.name).width >= this.size - 10){
            ctx.font='12px serif';	
        }


		ctx.fillText(this.name, (this.x+(this.size/2))-(ctx.measureText(this.name).width*.5), this.y+((this.size/2))+(3)); 
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
    isClicked(clickX, clickY){
        return(clickX > this.x && clickX < this.x + this.size && clickY > this.y && clickY < this.y + this.size);
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

    nudge(direction){
        switch(direction){
            case "up":
                this.y -= 1;
                break;
            case "down":
                this.y += 1;
                break;
            case "left":
                this.x -= 1;
                break;
            case "right":
                this.x += 1;
                break;
        }
    }
    
}