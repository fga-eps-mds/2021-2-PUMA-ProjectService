/* eslint-disable no-restricted-syntax */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');
const subareaRepository = require('../repository/subareaRepository');

module.exports = {
  addSubject: (input) => new Promise(async (resolve, reject) => {
    try {
      const { subject, keywords, subarea } = input;

      const subjectResponse = await subjectRepository.addSubject(subject);

      const keywordsResponse = await subjectUtils.addUniqueKeywords(keywords);

      await subjectUtils.addSubjectKeywordRelation(subjectResponse, keywordsResponse);

      await subjectUtils.addSubjectSubareaRelation(subjectResponse, subarea);

      resolve({
        subject: subjectResponse,
        keywords: keywordsResponse,
      });
    } catch (e) {
      reject(e);
    }
  }),
};

const subjectUtils = {
  addUniqueKeywords: async (keywords) => {
    let keywordsFiltered = await Promise.all(keywords.map(async (keyword) => {
      const keywordExists = await keywordRepository.getKeywordByName(keyword);
      console.log(keywordExists);
      if (!keywordExists) {
        return [keyword];
      }
      return [];
    }));

    keywordsFiltered = keywordsFiltered.filter((key) => key.length > 0);

    return keywordsFiltered.length > 0
      ? (keywordRepository.addManyKeywords(keywordsFiltered)) : [];
  },

  addSubjectKeywordRelation: async (subject, keywords) => {
    for await (const keyword of keywords) {
      keywordRepository.addKeywordSubjectRelation({
        keywordid: keyword.keywordid,
        subjectid: subject.subjectid,
      });
    }
  },

  addSubjectSubareaRelation: async (subject, subarea) => {
    await subareaRepository.addSubjectSubareaRelation({
      subareaid: subarea.subareaid,
      subjectid: subject.subjectid,
    });
  },
};
