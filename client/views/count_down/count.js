Template.counter.rendered = function() {

	theCount = document.getElementById("count");
	var count = 20;
	var i;

	function startCountDown(){

		theCount.innerHTML = count--;
		//start countdown
		var x = setTimeout( startCountDown, 1000 );
			if ( count < 0 ){
				clearTimeout(x);
				displayEndScreen();
				if ( theScore.innerHTML >= 150 ){
			startSpriteAnimation();
				}	
			}
	}
};