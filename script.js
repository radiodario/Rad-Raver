;(function() {

	var $ 		= document,
		canvas 	= $.getElementsByTagName('canvas')[0],
		ctx 	= canvas.getContext('2d'),
		worker 	= new Worker('./worker.js');

	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		console.log('resize called');
	}

	resize(), window.addEventListener('resize', resize);

	worker.onmessage = function(e) {
		
		switch(e.data.obj) {
			case 'nearRoad':
				nearRoad.data = e.data.payload;
				break;
			
			case 'farRoad':
				farRoad.data = e.data.payload;
				break;
			
			case 'car':
				car.data = e.data.payload;
				break;

			case 'sky':
				sky.data = e.data.payload;
				break;
			
			case 'hud':
				hud.data = e.data.payload;
				break;

			default:
				throw "Main didn't understand your request with obj value of '" + e.data.obj + "'";
		}

	};

	var nearRoad = function() {
		this.data = {};

		this.draw = function(canvas, ctx) {

		};

		this.update = function() {
			worker.postMessage({obj: 'nearRoad'});
		};

	};

	var farRoad = function() {
		this.data = {};

		this.draw = function(canvas, ctx) {

		};

		this.update = function() {
			worker.postMessage({obj: 'farRoad'});
		};

	};

	var car = function() {
		this.data = {};

		this.draw = function(canvas, ctx) {

		};

		this.update = function() {
			worker.postMessage({obj: 'car'});
		};

	};

	var sky = function() {
		this.data = {};


		var image = new Image();
		image.src = './lib/img/sky.png';
		this.draw = function(canvas, ctx) {

			for(var i=-1; i < Math.ceil(canvas.width / image.width); i++) {
				for(var j=0; j < Math.ceil(canvas.height / image.height); j++) {
					ctx.drawImage(image, (image.width * i) + this.data.x, image.height * j);
				}
			}
		
		};

		this.update = function() {
			worker.postMessage({obj: 'sky'});
		};

	};

	var hud = function() {
		this.data = {};

		this.draw = function(canvas, ctx) {

		};

		this.update = function() {
			worker.postMessage({obj: 'hud'});
		};

	};

	nearRoad = new nearRoad();
	farRoad = new farRoad();
	car = new car();
	sky = new sky();
	hud = new hud();

	function loop() {
		sky.update();
		farRoad.update();
		nearRoad.update();
		car.update();
		hud.update();

		requestAnimationFrame(loop);

		sky.draw(canvas, ctx);
		farRoad.draw(canvas, ctx);
		nearRoad.draw(canvas, ctx);
		car.draw(canvas, ctx);
		hud.draw(canvas, ctx);
	}

	requestAnimationFrame(loop);

})();