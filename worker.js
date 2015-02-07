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

	// @todo Remove this test code
	result.x = Math.cos(tick * 4) * 40;

	postMessage({obj: 'nearRoad', payload: result});
	data.nearRoad = result;

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

	// @todo Remove this test code
	result.x = Math.cos(tick * 5) * 40;

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
			// The only reason I'm using throw is because this project needs to be completed asap, so no soft logging, just hard and cruel errors
			throw "Worker didn't understand your request with obj value of '" + e.data.obj + "'";
	}

};