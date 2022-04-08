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
};
