Template.bins.rendered = function() {

	Meteor.Loader.loadJs("http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js", 10000).done(yuiLoaded);

	var data = {
		"myImages": [
			{
				"id": "recycling",
				"src": "/aluminum-cans.png"
			},
            {
				"id": "compost",
				"src": "/cutlery-compostable.png"
			},
            {
				"id": "recycling-compost",
				"src": "/paperbag-sm.png"
			},
            {
				"id": "compost",
				"src": "/paper-take-away-container.png"
			},
            {
				"id": "recycling",
				"src": "/plastic-cup.png"
			},
			{
				"id": "recycling",
				"src": "/foil-wrapper.png"
			},
			{
				"id": "compost",
				"src": "/tea-bag.png"
			},
			{
				"id": "trash",
				"src": "/wrapper-granola.png"
			},
            {
				"id": "recycling",
				"src": "/bleach.png"
			},
            {
				"id": "compost",
				"src": "/chopsticks.png"
			},
            {
				"id": "compost",
				"src": "/pizza-box.png"
			},
			{
				"id": "recycling-compost",
				"src": "/brownbag.png"
			},
			{
				"id": "compost",
				"src": "/sushi.png"
			},
			{
				"id": "recycling",
				"src": "/aluminum-foil.png"
			},
			{
				"id": "trash",
				"src": "/cutlery.png"
			},
			{
				"id": "trash",
				"src": "/chip_bag.png"
			},
			{
				"id": "compost",
				"src": "/napkin.png"
			},
			{
				"id": "trash",
				"src": "/styrofoam.png"
			},
			{
				"id": "compost",
				"src": "/compostable_plasticcup.png"
			},
			{
				"id": "compost",
				"src": "/compostable_plate.png"
			},
			{
				"id": "compost",
				"src": "/papercoffeecup.png"
			},
			{
				"id": "compost",
				"src": "/apple.png"
			},
			{
				"id": "trash",
				"src": "/ketchup_mustard_packets.png"
			},
            {
				"id": "trash",
				"src": "/styrofoam_coffeecup.png"
			},
            {
				"id": "trash",
				"src": "/creamer.png"
			},
            {
				"id": "recycling-compost",
				"src": "/cuptray.png"
			},
            {
				"id": "recycling",
				"src": "/glassbottle.png"
			},
            {
				"id": "recycling-compost",
				"src": "/glovebox.png"
			},
            {
				"id": "recycling",
				"src": "/ojcarton.png"
			},
            {
				"id": "recycling",
				"src": "/waterbottle.png"
			}
		]
	};

	var theItemTarget = document.getElementsByTagName("img")[0];
	var theBins= document.getElementById("bins");

	function displayNewItem () {
		var i = Math.floor(Math.random() * data.myImages.length);
		var theNewImageSource = data.myImages[i].src;
		var theNewImageId = data.myImages[i].id;
		theItemTarget.setAttribute("src", theNewImageSource);
		theItemTarget.setAttribute("id", theNewImageId);
	}

	displayNewItem();

	function shakeBin(target){
		target.setAttribute("class", "target shake yui3-dd-drop");
		setTimeout(function() {
			target.setAttribute("class", "target yui3-dd-drop");
		}, 300);	
	}
	 	
//DRAG  (YUI http://yuilibrary.com/yui/docs/dd/)

	var yuiLoaded = function() {

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

	}

};