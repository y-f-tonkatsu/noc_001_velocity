var Mover;

(function(){
	
	Mover = function(stage, loaction, velocity, acceleration){
		
		this._location = loaction || new Vector(0, 0);
		this._velocity = velocity || new Vector(1, 1);
		this._acceleration = acceleration || new Vector(0, 0);
		this._radius = 30;
		
		this._blur = false;
		this._blurs = [];
		
		//init cjs objects
		this._graphics = new createjs.Graphics();
		this._shape = new createjs.Shape(this._graphics);
		this._stage = stage;
		this._stage.addChild(this._shape);
		
		this._stageSize = new Vector(this._stage.canvas.width, this._stage.canvas.height);
			
	};
	
	Mover.prototype = {
		
		'clear':function(){
			
			this._graphics.clear();
			this._stage.removeAllChildren();
			this._stage.update();
			
		},
		
		'setVelocityTo':function(v){
			
			this._velocity = this._location.dir(v).mult(this._location.dist(v) * 0.1);
			
		},
		
		'setAccelerationTo':function(v){
			
			this._velocity.mult(0.95);
			this._acceleration = this._location.dir(v).mult(this._location.dist(v) * 0.01);
			
		},
		
		'update':function(){
			
			this._velocity.add(this._acceleration);
			if(this._blur){this.setBlurs();}
			this._location.add(this._velocity);
						
			this.draw();
			
		},
		
		'setBlurs':function(){
			
			var numBlurs = Math.floor(this._velocity.mag() * 0.5);
			this._blurs = _.map(_.range(numBlurs), _.bind(function(current){
				var position = Math.pow((current) / numBlurs, 2);
				var alpha = position * 0.4;
				return {
					'location': new Vector(
						this._location.x + this._velocity.x * position,
						this._location.y + this._velocity.y * position
					),
					'alpha': alpha
				};
			}, this));
			
		},
		
		'drawBlurs':function(){
			
			_.each(this._blurs, _.bind(function(blur){
				this._graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, blur.alpha)).
				dc(blur.location.x, blur.location.y, this._radius)
				.endFill();
			}, this));
			
		},
		
		'setBlurOn':function(){
			this._blur = true;
		},
		
		'draw':function(){
				
			//画面外に出た場合、反対側から出てくる
			var location = Vector.sub(this._location, new Vector(
				Math.floor(this._location.x / this._stageSize.x) * this._stageSize.x,
				Math.floor(this._location.y / this._stageSize.y) * this._stageSize.y
			));
		
			this._graphics.clear();
			
			if(this._blurs && this._blurs.length > 1){this.drawBlurs()}
			
			this._graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0)).
			dc(location.x, location.y, this._radius)
			.endFill();
		}
			
	};
	
})();