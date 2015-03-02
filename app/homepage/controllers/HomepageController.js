if (Meteor.isClient) {
	Meteor.subscribe("project");
	Meteor.subscribe("userStatus");

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

	Template.user.helpers({
		labelClass: function() {
		  if (this.status && this.status.idle)
		    return "label-warning"
		  else if (this.status && this.status.online)
		    return "label-success"
		  else
		    return "label-default"
		}
	});

	Template.AppLayout.helpers({
		usersOnline: function() {
		  return Meteor.users.find();
		}
	});
}

if (Meteor.isServer) {
	Meteor.publish("userStatus", function() {
	  return Meteor.users.find({'status.online': true});
	});
}