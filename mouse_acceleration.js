$(function(){
	
	var stage = new createjs.Stage($('#canvas').get(0));
	var mover = new Mover(stage,
		new Vector(0, 0), //初期位置
		new Vector(0, 0), //速度
		new Vector(0, 0) //加速度
	);
	
	createjs.Ticker.framerate = 30;
	
	createjs.Ticker.addEventListener('tick', function(e){
		
		mover.setAccelerationTo(new Vector(stage.mouseX, stage.mouseY));
		mover.update();
		stage.update(e);
		
	});
	
});