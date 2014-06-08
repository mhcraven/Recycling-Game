Template.audio.rendered = function() {

//audio effects found on freesound.org (soundbyter-bicycle-bell-ringer; 167428__beroland1__trucksequence; 129488__onironauta20__glass)
//background music found on soundcloud.com (R3HAB - I NEED R3HAB 028)

	var wrongBin = document.getElementById("bad-sound");
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
};