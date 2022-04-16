const db = require('../../dbconfig/dbConfig');

module.exports = {
  addSubject: (input) => new Promise((resolve, reject) => {
    const { name, courseSyllabus } = input;
    db.query(
      'INSERT INTO SUBJECT(name, courseSyllabus) VALUES ($1,$2) RETURNING *',
      [name, courseSyllabus],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => reject(e));
  }),
  getSubjects: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT DISTINCT s.subjectid, s.name FROM subject s ORDER BY subjectid DESC',
      ).then((response) => {
        resolve(response.rows);
      }).catch((response) => {
        reject(response);
      });
    });
  },
};
