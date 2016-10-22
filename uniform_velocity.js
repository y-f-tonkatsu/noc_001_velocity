$(function(){
	
	var stage = new createjs.Stage($('#canvas').get(0));
	var mover = new Mover(stage,
		new Vector(100, 100), //初期位置
		new Vector(5, 10), //速度
		new Vector(0, 0) //加速度
	);
	
	createjs.Ticker.framerate = 30;
	
	createjs.Ticker.addEventListener('tick', function(e){
		
		mover.update();
		stage.update(e);
		
	});
	
});