const projectRoutes = require('./ProjectRoutes');
const subjectRoutes = require('./SubjectRoutes');

module.exports = (app) => {
  app.use('/', [
    projectRoutes,
    subjectRoutes,
  ]);
};
