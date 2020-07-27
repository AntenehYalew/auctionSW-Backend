module.exports = function (app) {
  //import all routes
  app.use(require("./projectData"));
  app.use(require("./login"));
};
