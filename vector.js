var Vector;

(function(){
	
	Vector = function(x, y){
			
		this.x = x;
		this.y = y;
		
	};
	
	//static funcs
	_.each(['add', 'sub', 'nomalize'], function(method){
		Vector[method] = function(v1, v2){
			var v3 = v1.clone();
			v3[method](v2);
			return v3;
		};
	});
	
	var getVectorFromArgs = function(args){
		if(args.length > 1){
			return new Vector(args[0], args[1])
		} else {
			return args[0];
		}
	};
	
	Vector.prototype = {
		
		'clone':function(){
			return new Vector(this.x, this.y);
		},
		
		'add':function(){
			var v = getVectorFromArgs(arguments);
			this.x += v.x;
			this.y += v.y;
			return this;
		},
			
		'sub':function(v){
			var v = getVectorFromArgs(arguments);
			this.x -= v.x;
			this.y -= v.y;
			return this;
		},
			
		'mult':function(v){
			this.x *= v;
			this.y *= v;
			return this;
		},
			
		'div':function(v){
			this.x /= v;
			this.y /= v;
			return this;
		},
			
		'mag':function(){
			return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		},
		
		'nomalize':function(v){
			if(this.mag() === 0){
				return this;
			}
			this.div(this.mag());
			return this;
		},
		
		'dist':function(v){
			return Vector.sub(this, v).mag();
		},
			
		'dir':function(v){
			var v2 = Vector.sub(v, this);
			v2.nomalize();
			return v2;
		}
			
	};
	
})();