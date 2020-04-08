const availableTranslateAI = [
  "Google Cloud Translate",
  "IBM Language Translator"
];

const { extractTexts } = require("./google/vision.js");

const { translateText, detectLanguage } = require("./google/translate.js");
const { translateTextIBM } = require("./ibm/language-translator.js");

const translate = [translateText, translateTextIBM];

module.exports = {
  availableTranslateAI,
  extractTexts,
  detectLanguage,
  translate
};
