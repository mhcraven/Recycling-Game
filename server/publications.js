Meteor.publish('hiscores', function(){
	return Hiscores.find();
});