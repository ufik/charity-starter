if (Meteor.isClient) {
	Meteor.subscribe("project");

	ProjectController = RouteController.extend({
		layoutTemplate: 'AppLayout',

		list: function () {
			this.render('projectList', {
				data: {projects: Project.find()}
			});
		},

	    create: function () {
	      this.render('projectCreate');
	    },

	    detail: function() {
	    	this.render('projectDetail', {
	    		data: {
	    			project: Project.findOne({title: this.params.name})
	    		}
	    	});
	    }
	});

	Template.projectItem.helpers({
		isOwner: function () {
			return this.owner === Meteor.userId();
		}
	});

	Template.projectList.events({
		'click .delete': function (event) {
			Meteor.call('deleteProject', this._id);
		}
	});

	Template.projectCreate.events({
		'click #submitNewProject': function (event) {
			event.preventDefault();
			// TODO add validation
			Meteor.call('addProject', $("#title").val(), $("#description").val(), $("#targetAmount").val(), $("#publish").prop('checked'));
			
			Router.go('projectList');

			return false;
		}
	});
}

Meteor.methods({
  addProject: function (title, description, targetAmount, publish) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Project.insert({
      title: title,
      description: description,
      targetAmount: targetAmount,
      currentAmount: 0,
      private: !publish,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  deleteProject: function (projectId) {
    var project = Project.findOne(projectId);
    if (project.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Project.remove(projectId);
  },
  setProjectPrivate: function (projectId, setToPrivate) {
    var project = Project.findOne(projectId);

    if (project.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Project.update(projectId, { $set: { private: setToPrivate } });
  }
});