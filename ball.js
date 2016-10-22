var Ball;

(function(){
	
	Ball = function(stage){
		
		this.velocity = new Vector(3, 1);
		this.location = new Vector(30, 30);
		this.radius = 30;
			
		this._graphics = new createjs.Graphics();
		this._shape = new createjs.Shape(this._graphics);
		this._stage = stage;
		this._stage.addChild(this._shape);
		
		this._blur = [];
		
	};
	
	Ball.prototype = {
		
		'checkUnderX':function(){
			return this.location.x - this.radius <= 0;
		},
		
		'checkOverX':function(){
			return this.location.x + this.radius >= this._stage.canvas.width;
		},
		
		'checkUnderY':function(){
			return this.location.y - this.radius <= 0;
		},
		
		'checkOverY':function(){
			return this.location.y + this.radius >= this._stage.canvas.height;
		},
		
		'update':function(){
						
			var pl = this.location.clone();
			
			this.location.add(this.velocity);
			var vx = 0.5;
			var vy = 0.5;
			if(this.velocity.x < 0){vx = -vx;}
			if(this.velocity.y < 0){vy = -vy;}
			this.velocity.add(vx, vy);
			
			if(this.checkOverX()){
				this.location.x = this._stage.canvas.width - this.radius;
				this.velocity.x = -this.velocity.x;
			} else if (this.checkOverY()){
				this.location.y = this._stage.canvas.height - this.radius;
				this.velocity.y = -this.velocity.y;
			} else if (this.checkUnderX()){
				this.location.x = this.radius;
				this.velocity.x = -this.velocity.x;
			} else if (this.checkUnderY()){
				this.location.y = this.radius;
				this.velocity.y = -this.velocity.y;
			}
			
			var v = Math.floor(this.velocity.mag() / 10);
			this._blur = _.map(_.range(v), _.bind(function(n){
				var x = pl.x + (this.location.x - pl.x) * (1 - Math.pow(n / v, 2));
				var y = pl.y + (this.location.y - pl.y) * (1 - Math.pow(n / v, 2));
				return new Vector(x, y);
			}, this));
			console.log(this._blur);
		},
		
		'draw':function(){
			
			this._graphics.clear();
			
			var i = this._blur.length;
			var totalA = 0;
			_.each(this._blur, _.bind(function(b){
				i--;
				var a = i / (this._blur.length * 10);
				totalA += a;
				console.log(a);
				this._graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, a)).
				dc(b.x, b.y, this.radius).
				endFill();
			}, this));
			
			this._graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, 1 - totalA)).
			dc(this.location.x, this.location.y, this.radius)
			.endFill();
						
		}
			
	}
	
})();

