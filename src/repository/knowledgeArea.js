const db = require('../../dbconfig/dbConfig');

module.exports = {
  addKnowledgeArea: (input) => new Promise((resolve, reject) => {
    const { knowledgeArea } = input;
    db.query(
      'INSERT INTO KNOWLEDGE_AREA(knowledgeArea) VALUES ($1) RETURNING *',
      [knowledgeArea],
    ).then((response) => {
      resolve(response.rows[0].knowledgeAreaId);
    }).catch((e) => reject(e));
  }),
};
