if (Meteor.isClient) {
	Meteor.subscribe("project");

	HomeController = RouteController.extend({
		layoutTemplate: 'AppLayout',

	    action: function () {
	      this.render('Home', {
	      	data: {
	      		projects: Project.find()
	      	}
	      });
	    }
	});
}