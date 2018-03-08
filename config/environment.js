'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'my-app',
    environment
  };

  if (environment === 'production') {
    ENV.rootURL = '/sierpinski-glimmer/';
    ENV.locationType = 'hash';
  }

  return ENV;
};
