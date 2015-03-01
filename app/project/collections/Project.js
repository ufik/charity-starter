Project = new Mongo.Collection("project");

if (Meteor.isServer) {
  Meteor.publish("project", function () {
    return Project.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}