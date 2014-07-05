
window.onload = function(){

	var data = {
		"myImages": [
			{
				"id": "recycling",
				"src": "images/aluminum-cans.png"
			},
                        {
				"id": "compost",
				"src": "images/cutlery-compostable.png"
			},
                        {
				"id": "recycling-compost",
				"src": "images/paperbag-sm.png"
			},
                           {
				"id": "compost",
				"src": "images/paper-take-away-container.png"
			},
                        {
				"id": "recycling",
				"src": "images/plastic-cup.png"
			},
{
				"id": "recycling",
				"src": "images/foil-wrapper.png"
			},
{
				"id": "compost",
				"src": "images/tea-bag.png"
			},
{
				"id": "trash",
				"src": "images/wrapper-granola.png"
			},
                       {
				"id": "recycling",
				"src": "images/bleach.png"
			},
                        {
				"id": "compost",
				"src": "images/chopsticks.png"
			},
                         {
				"id": "compost",
				"src": "images/pizza-box.png"
			},
			{
				"id": "recycling-compost",
				"src": "images/brownbag.png"
			},
			{
				"id": "compost",
				"src": "images/sushi.png"
			},
			{
				"id": "recycling",
				"src": "images/aluminum-foil.png"
			},
			{
				"id": "trash",
				"src": "images/cutlery.png"
			},
			{
				"id": "trash",
				"src": "images/chip_bag.png"
			},
			{
				"id": "compost",
				"src": "images/napkin.png"
			},
			{
				"id": "trash",
				"src": "images/styrofoam.png"
			},
			{
				"id": "compost",
				"src": "images/compostable_plasticcup.png"
			},
			{
				"id": "compost",
				"src": "images/compostable_plate.png"
			},
			{
				"id": "compost",
				"src": "images/papercoffeecup.png"
			},
			{
				"id": "compost",
				"src": "images/apple.png"
			},
			{
				"id": "trash",
				"src": "images/ketchup_mustard_packets.png"
			},
                        {
				"id": "trash",
				"src": "images/styrofoam_coffeecup.png"
			},
                        {
				"id": "trash",
				"src": "images/creamer.png"
			},
                        {
				"id": "recycling-compost",
				"src": "images/cuptray.png"
			},
                         {
				"id": "recycling",
				"src": "images/glassbottle.png"
			},
                        {
				"id": "recycling-compost",
				"src": "images/glovebox.png"
			},
                        {
				"id": "recycling",
				"src": "images/ojcarton.png"
			},
                        {
				"id": "recycling",
				"src": "images/waterbottle.png"
			}

			
		]
	};

	
//AUDIO
//audio effects found on freesound.org (soundbyter-bicycle-bell-ringer; 167428__beroland1__trucksequence; 129488__onironauta20__glass)
//background music found on soundcloud.com (R3HAB - I NEED R3HAB 028)

	//var wrongBin = document.getElementById("bad-sound");
	var correctBin = document.getElementById("good-sound");
	var introMusic = document.getElementById("intro-music");
	var highScoreBell = document.getElementById("bell-sound");
	var pauseMusicBtn = document.getElementById("pauseMusic-button");
	pauseMusicBtn.addEventListener( "click", musicPausePlay, false );

	introMusic.loop = true;
	introMusic.play();
	//wrongBin.volume=.5;
	correctBin.volume=.5;
	introMusic.volume=.5;

	function musicPausePlay() {
		if (introMusic.paused){
			introMusic.play();
			pauseMusicBtn.value = "PAUSE MUSIC";
		}	else{
			introMusic.pause();
			pauseMusicBtn.value = "PLAY MUSIC";
		}
	}


//PLAY GAME

//buttons

	var startBtn = document.getElementById("start-button");
	startBtn.addEventListener( "click", startGame, false );

	var saveBtn = document.getElementById("save-button");
	saveBtn.addEventListener( "click", saveScore, false );

	var playAgainBtn = document.getElementById("playAgain-button");
	playAgainBtn.addEventListener( "click", startGame, false );

	var endGameBtn = document.getElementById("end-button");
	endGameBtn.addEventListener( "click", reSet, false );

//other global variables
	
	var nameField = document.getElementById("user-name");
	var theCount = document.getElementById("count");
	var theScore = document.getElementById("score");
	var count = 20;
	var i;
	var theItemTarget = document.getElementsByTagName("img")[0];
	var theBins= document.getElementById("bins");
	var screenArea = document.getElementById("popup-screens");
	var introScreen = document.getElementById("introScreen");
	var endScreen = document.getElementById("endScreen");
	var sprite = document.getElementById("sprite-container");

	function startGame(){
		
		reSet();

		//remove screens if they are visible
		if (introScreen.getAttribute("class") === "screen"){
			introScreen.setAttribute("class", "no-screen");
		}

		if (endScreen.getAttribute("class") === "screen"){
			endScreen.setAttribute("class", "no-screen");
		}

		if (screenArea.getAttribute("class") === ""){
			screenArea.setAttribute("class", "invisible");
		}
		
		displayNewItem();
		startCountDown();
	}

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

	function getScore(){
		return theScore.innerHTML;
	}

	function displayEndScreen() {
		theItemTarget.removeAttribute("class");
		theItemTarget.setAttribute("draggable", "false");
		if (screenArea.getAttribute("class") === "invisible"){
			screenArea.setAttribute("class", "");
		}
		//determine which end screen message to post
		if ( getScore() < 100 ){ //try harder
			endScreen.setAttribute("class", "screen");
			document.getElementById("saveScoreOpt").innerHTML = "Your score is<br><span class='large black-score'>" + getScore() + "</span> <br> Play again to improve your score!";
				saveBtn.setAttribute("class", "invisible");
				nameField.setAttribute("class", "invisible");
			} else if ( getScore() >= 100 ){ //well done
					endScreen.setAttribute("class", "screen");
					document.getElementById("saveScoreOpt").innerHTML = "Your score is<br> <span class='large high-score'>" + getScore() + "</span> <br> Nice job! Add your name to the leader board or play again!";
			  		//} else if ( getScore() >= 100 && isHighScore() ){ //congrats, yours is a top score
			//endScreen.setAttribute("class", "screen");
		//	document.getElementById("saveScoreOpt").innerHTML = "Your score is<br> <span class='large high-score'>" + getScore() + "</span> <br> Nice job! Add your name to the leader board or play again!";
				saveBtn.setAttribute("class", " ");
				nameField.setAttribute("class", " ");
			}
	}
	
	//	function isHighScore() {
			//for ( var i = 0; i < numScores; i++ ){
			//	if (getScore() <= numScore){			
			//	return true;
		//}

	function reSet(){
		if ( count !== 20 ){
			count = 20;
		}
		//reset counter to 20 seconds
		theCount.innerHTML = 20;

		//reset score to zero 
		theScore.innerHTML = 0;
		theScore.setAttribute("class", "black-score");

		sprite.setAttribute("class", "");
		
		//add intro screen
		if (introScreen.getAttribute("class") === "no-screen"){
			introScreen.setAttribute("class", "screen");
		}

		//remove end screen if it's visible
		if (endScreen.getAttribute("class") === "screen"){
			endScreen.setAttribute("class", "no-screen");
		}

		//reset score color
		if (theScore.getAttribute("class") === "green-score"){
			theScore.setAttribute("class", "black-score");
		}

	}

	function displayNewItem () {
		var i = Math.floor(Math.random() * data.myImages.length);
		var theNewImageSource = data.myImages[i].src;
		var theNewImageId = data.myImages[i].id;
		theItemTarget.setAttribute("src", theNewImageSource);
		theItemTarget.setAttribute("id", theNewImageId);
	}
		
	function addPoints(){

		theScore.innerHTML = parseInt(theScore.innerHTML, 10) + 10;

		if ( theScore.innerHTML == 0 ){
			theScore.setAttribute("class", "black-score");
			
		}	
		if ( theScore.innerHTML == 100 ){
			theScore.setAttribute("class", "high-score");
			highScoreBell.play();
		}
	}

		function startSpriteAnimation(){	
			sprite.setAttribute("class", "sprite");
		}

		function stopSpriteAnimation(){
			sprite.setAttribute("class", "");
		}

	function subtractPoints(){
	
		theScore.innerHTML = parseInt( theScore.innerHTML,

		 10 ) - 10;
		
		if ( theScore.innerHTML < 0 ){
			theScore.setAttribute("class", "low-score");
		}
		if ( theScore.innerHTML == 90 ){
			theScore.setAttribute("class", "black-score");
		}
	}

	function shakeBin(target){
		target.setAttribute("class", "target shake yui3-dd-drop");
		setTimeout(function() {
			target.setAttribute("class", "target yui3-dd-drop");
		}, 300);
		
	}

//PROGRESS BAR
	 

	
//DRAG  (YUI http://yuilibrary.com/yui/docs/dd/)

	YUI({ filter: 'raw' }).use('dd-drop', 'dd-proxy', 'dd-constrain', 'dd-ddm-drop', function(Y) {

		var ddItem = new Y.DD.Drag({
	        node: '.drag',
		});

		ddItem.on('drag:start', function(){
	        var	n = this.get('node');
	            n.setStyle('opacity', .25);
		});

		function removeHoverState(e) {
			var dropTarget = e.drop.get('node');
			var targetId = dropTarget.get('id');

	        if ( targetId === "binR" ){
	        	dropTarget.setAttribute("src", "images/singlestream.png");
	        	theItemTarget.setAttribute("class", "drag");
	        }
	        if ( targetId === "binT" ){
	        	dropTarget.setAttribute("src", "images/trash.png");
	        	theItemTarget.setAttribute("class", "drag");
	        }
	        if ( targetId === "binC" ){
	        	dropTarget.setAttribute("src", "images/compost.png");
	        	theItemTarget.setAttribute("class", "drag");
	        }

	    }

	    function addHoverState(e){
	    	var dropTarget = e.drop.get('node');
			var targetId = dropTarget.get('id');

	    	if ( targetId === "binR" ){
	        	dropTarget.setAttribute("src", "images/singlestream-hover.png");
	        	theItemTarget.setAttribute("class", "drag shrink-it");
	        }
	        if ( targetId === "binT" ){
	        	dropTarget.setAttribute("src", "images/trash-hover.png");
	        	theItemTarget.setAttribute("class", "drag shrink-it");
	        }
	        if ( targetId === "binC" ){
	        	dropTarget.setAttribute("src", "images/compost-hover.png");
	        	theItemTarget.setAttribute("class", "drag shrink-it");
	        }
	    }

	    ddItem.on('drag:enter', function(e){
			addHoverState(e);	    	
		});

		ddItem.on('drag:exit', function(e){
			 removeHoverState(e);
		});
		
		var dropNodes = Y.Node.all('.target');
		
		dropNodes.each(function(v, k) {
	    	var tar = new Y.DD.Drop({
	        node: v
		        });
	    });   

		Y.DD.DDM.on('drag:drophit', function(e) {
   
	       	var itemDragged = e.drag.get('node');
	       	var thisItemId = itemDragged.get('id');

	       	var dropTarget = e.drop.get('node');
	       	var targetId = dropTarget.get('id');

	       	var theData = data.myImages;

	       	removeHoverState(e);	       

	       	if ( targetId === "binR" && thisItemId === "recycling" || targetId === "binR" && thisItemId === "recycling-compost"){
	       	 	addPoints();
	       	 	correctBin.play();
	       	} else if ( targetId === "binT" && thisItemId === "trash" ){
		       	addPoints();
		       	correctBin.play();
		    } else if ( targetId === "binC" && thisItemId === "compost" || targetId === "binC" && thisItemId === "recycling-compost"){
		       	addPoints();
		       	correctBin.play();
		    } else {
		       	subtractPoints();
		       	shakeBin(dropTarget);
		    }

	       	displayNewItem ()	
	    });

	    ddItem.on('drag:end', function(e) {
	       	e.preventDefault();
	        var n = this.get('node');
			n.setStyle('opacity', '1');
		});
	});
	

// STORE SCORES LOCALLY
	
	var scoreData = {"theStats" : []}; 
	var scoreArea = document.getElementById("scoreboard");

	//add and store when 'add name' button is clicked
	function saveScore(){	

		//if no name is entered into the field, use 'anonymous'	
		if ( nameField.value == ""){
			nameField.value = "TIM the Beaver";
		}

		//save name and score to JSON object
		scoreData.theStats.push( {"player": nameField.value,
								"score": getScore() } );
		
		//store JSON object locally
		var stringObj = JSON.stringify(scoreData);
		localStorage.setItem("scoreData", stringObj);

		//remove end screen
		endScreen.setAttribute("class", "no-screen");

		//add intro screen
		introScreen.setAttribute("class", "screen");

		reSet();
		displayScore();
	}

	//add name and score to leaderboard
	function displayScore(){	
		var storedItem = localStorage.getItem("scoreData");
		var convertObj = JSON.parse(storedItem);
		
			//sort top five scores so highest score is at the top
			if (convertObj == null || storedItem == undefined) {
			
			}	else if ( convertObj != null ){
				

					clearDisplay();

					if ( convertObj.theStats.length > 1 ){	
						sortScores( convertObj.theStats, "score");
					}
					
					var numScores = convertObj.theStats.length;
		            if ( numScores > 3){
		                numScores = 3;
		            }
		            
					for ( var i = 0; i < numScores; i++ ){
						var li = document.createElement("ol");
						li.innerHTML = "<em>" + convertObj.theStats[i].player + "</em>" + "<br> score: "+ convertObj.theStats[i].score;	
						scoreArea.appendChild(li);
					} 	
				}	
	}

	function clearDisplay(){
		var theLi = document.getElementsByTagName("ol");
		while (theLi[0]) theLi[0].parentNode.removeChild(theLi[0]);
	}

	//code for sorting obtained from http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-javascript-objects
	var sortBy = function (field, reverse, primer){
		var key = function (x) {return primer ? primer(x[field]) : x[field]};

		   return function (a,b) {
		       var A = key(a), B = key(b);
		       return ((A < B) ? +1 :
		               (A > B) ? -1 : 0) * [-1,1][+!!reverse];                  
		   }
		}

	function sortScores(objects, key){
		objects.sort(sortBy('score', true, parseInt));
    }
	

  
	displayNewItem();
	//displayScore();

}();