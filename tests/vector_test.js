var testVector = function(){
	
	mochaSetup();
	
	suite('Vector', function() {
		
		setup(function(){
		});
		
		
		test("Vector()", function() {
			var v = new Vector(10, 20);
			assert.strictEqual(10, v.x, 'コンストラクタで x の値を初期化できた');
			assert.strictEqual(20, v.y, 'コンストラクタで y の値を初期化できた');
		});
				
		test("add()", function() {
			var v = new Vector(10, 20);
			v.add(new Vector(5, 15));
			assert.strictEqual(15, v.x, 'Vector と Vector を加算した');
			assert.strictEqual(35, v.y, 'Vector と Vector を加算した');
			v.add(100, 200);
			assert.strictEqual(115, v.x, 'Vector と数値を加算した');
			assert.strictEqual(235, v.y, 'Vector と数値を加算した');
		});
				
		test("sub()", function() {
			var v = new Vector(10, 20);
			v.sub(new Vector(5, 8));
			assert.strictEqual(5, v.x, 'Vector と Vector を減算した');
			assert.strictEqual(12, v.y, 'Vector と Vector を減算した');
			v.sub(1, 3);
			assert.strictEqual(4, v.x, 'Vector と数値を加算した');
			assert.strictEqual(9, v.y, 'Vector と数値を加算した');
		});
				
		test("mult()", function() {
			var v = new Vector(10, 20);
			v.mult(5);
			assert.strictEqual(50, v.x, 'Vector と数値を乗算した');
			assert.strictEqual(100, v.y, 'Vector と数値を乗算した');
		});
				
		test("div()", function() {
			var v = new Vector(10, 20);
			v.div(5);
			assert.strictEqual(2, v.x, 'Vector と数値を乗算した');
			assert.strictEqual(4, v.y, 'Vector と数値を乗算した');
		});
				
		test("mag()", function() {
			var v = new Vector(3, 4);
			assert.strictEqual(5, v.mag(), 'ベクトル(3, 4) の大きさは 5');
		});
				
		test("nomalize()", function() {
			var v = new Vector(3, 4);
			v.nomalize();
			assert.strictEqual(0.6, v.x, 'ベクトル(3, 4) を正規化すると(0.6, 0.8)');
			assert.strictEqual(0.8, v.y, 'ベクトル(3, 4) を正規化すると(0.6, 0.8)');
			var v = new Vector(0, 0);
			v.nomalize();
			assert.strictEqual(0, v.x, '零ベクトルには何もしない');
			assert.strictEqual(0, v.y, '零ベクトルには何もしない');
		});
				
		test("clone()", function() {
			var v = new Vector(3, 4);
			var v2 = v.clone();
			assert.strictEqual(3, v2.x, 'Vector を複製した');
			assert.strictEqual(4, v2.y, 'Vector を複製した');
			v2.add(1, 1);
			assert.strictEqual(4, v2.x, '複製を操作しても元のオブジェクトに影響なし');
			assert.strictEqual(5, v2.y, '複製を操作しても元のオブジェクトに影響なし');
			assert.strictEqual(3, v.x, '複製を操作しても元のオブジェクトに影響なし');
			assert.strictEqual(4, v.y, '複製を操作しても元のオブジェクトに影響なし');
		});
				
		test("Vector.add()", function() {
			var v1 = new Vector(10, 20);
			var v2 = new Vector(30, 50);
			var v3 = Vector.add(v1, v2);
			assert.strictEqual(40, v3.x, 'static なメソッドでVector を加算した');
			assert.strictEqual(70, v3.y, 'static なメソッドでVector を加算した');
			assert.strictEqual(10, v1.x, 'static で加算した場合、もとのオブジェクトに影響なし');
			assert.strictEqual(20, v1.y, 'static で加算した場合、もとのオブジェクトに影響なし');
			assert.strictEqual(30, v2.x, 'static で加算した場合、もとのオブジェクトに影響なし');
			assert.strictEqual(50, v2.y, 'static で加算した場合、もとのオブジェクトに影響なし');
		});
				
		test("Vector.sub()", function() {
			var v1 = new Vector(10, 20);
			var v2 = new Vector(30, 50);
			var v3 = Vector.sub(v1, v2);
			assert.strictEqual(-20, v3.x, 'static なメソッドでVector を減算した');
			assert.strictEqual(-30, v3.y, 'static なメソッドでVector を減算した');
		});
				
		test("Vector.nomalize()", function() {
			var v = new Vector(3, 4);
			var v2 = Vector.nomalize(v);
			assert.strictEqual(0.6, v2.x, 'static なメソッドでVector を正規化した');
			assert.strictEqual(0.8, v2.y, 'static なメソッドでVector を正規化した');
			assert.strictEqual(3, v.x, 'static なメソッドでVector を正規化した場合、もとのオブジェクトに影響なし');
			assert.strictEqual(4, v.y, 'static なメソッドでVector を正規化した場合、もとのオブジェクトに影響なし');
		});
				
		test("dist()", function() {
			var v = new Vector(1, 2);
			var v2 = new Vector(4, 6);
			assert.strictEqual(5, v.dist(v2), 'ベクトル(1, 2) と (4, 6) の距離は 5');
			assert.strictEqual(5, v2.dist(v), 'ベクトル(1, 2) と (4, 6) の距離は 5');
		});
				
		test("dir()", function() {
			var v = new Vector(1, 2);
			var v2 = new Vector(4, 6);
			assert.strictEqual(0.6, v.dir(v2).x, 'ベクトル(1, 2) から (4, 6) へは(0.6, 0.8)の方向');
			assert.strictEqual(0.8, v.dir(v2).y, 'ベクトル(1, 2) から (4, 6) へは(0.6, 0.8)の方向');
			assert.strictEqual(-0.6, v2.dir(v).x, 'ベクトル(4, 6) から (1, 2) へは(-0.6, -0.8)の方向');
			assert.strictEqual(-0.8, v2.dir(v).y, 'ベクトル(4, 6) から (1, 2) へは(-0.6, -0.8)の方向');
			var v3 = v2.dir(v);
			v3.mult(5);
			assert.strictEqual(-3, v3.x, 'ベクトル(4, 6) から (1, 2) へは(-3, -4)の方向');
			assert.strictEqual(-4, v3.y, 'ベクトル(4, 6) から (1, 2) へは(-3, -4)の方向');
		});
				
	});
	
	$(function(){

		mocha.run();
		
	});
	
}();