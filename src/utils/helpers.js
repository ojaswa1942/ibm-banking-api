const xss = require('xss');

const stripScriptTags = (...args) => {
  const xssOptions = {
    whiteList: [],
    stripIgnoreTag: [],
    stripIgnoreTagBody: ['script'],
  };

  const answerArray = args.map((val) => (val ? xss(val, xssOptions) : val));
  return answerArray;
};

module.exports = {
  stripScriptTags,
};
