const db = require('../../dbconfig/dbConfig');

module.exports = {
  addSubarea: (input) => new Promise((resolve, reject) => {
    const { knowledgeAreaId, description } = input;
    db.query(
      'INSERT INTO SUBAREA(knowledgeAreaId, description) VALUES ($1,$2) RETURNING *',
      [knowledgeAreaId, description],
    ).then((response) => {
      resolve(response.rows[0]);
    }).catch((e) => reject(e));
  }),

  addSubjectSubareaRelation: (input) => new Promise((resolve, reject) => {
    const { subareaid, subjectid } = input;
    db.query(
      'INSERT INTO identifies(subareaid, subjectid) VALUES ($1,$2) RETURNING *',
      [subareaid, subjectid],
    ).then((response) => {
      resolve(response.rows);
    })
      .catch((e) => reject(e));
  }),
};
