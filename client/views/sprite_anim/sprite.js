Template.sprite.rendered = function(){

		var sprite = document.getElementById("sprite-container");

		function startSpriteAnimation(){	
			sprite.setAttribute("class", "sprite");
		}

		function stopSpriteAnimation(){
			sprite.setAttribute("class", "");
		}
};