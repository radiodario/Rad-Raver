var data = {
	nearRoad: {

	},
	farRoad: {

	},
	car: {
		x: 0,
		y: 0
	},
	sky: {
		x: 0
	},
	hud: {

	}
},
tick;

function updateNearRoad() {
	var result = data.nearRoad;

	postMessage({obj: 'nearRoad', payload: result});
}

function updateFarRoad() {
	var result = data.farRoad;

	postMessage({obj: 'farRoad', payload: result});
}

function updateCar() {
	var result = data.car;

	postMessage({obj: 'car', payload: result});
}

function updateSky() {
	var result = data.sky;

	result.x = Math.cos(tick * 10) * 10;

	postMessage({obj: 'sky', payload: result});
	data.sky = result;
}

function updateHud() {
	var result = data.hud;

	postMessage({obj: 'hud', payload: result});
}

onmessage = function(e) {
	tick = new Date().getTime() / 1000;
	switch(e.data.obj) {
		case 'nearRoad':
			updateNearRoad();
			break;
		
		case 'farRoad':
			updateFarRoad();
			break;
		
		case 'car':
			updateCar();
			break;

		case 'sky':
			updateSky();
			break;
		
		case 'hud':
			updateHud();
			break;

		default:
			throw "Worker didn't understand your request with obj value of '" + e.data.obj + "'";
	}

};