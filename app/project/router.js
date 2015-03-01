Router.route('/projects', {
  name: 'projectList',
  controller: 'ProjectController',
  action: 'list'
});

Router.route('/projects/:name', {
  name: 'projectDetail',
  controller: 'ProjectController',
  action: 'detail'
});

Router.route('/projects/create', {
  name: 'projectForm',
  controller: 'ProjectController',
  action: 'create'
});