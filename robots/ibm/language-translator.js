const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

var credential = require("../../" + process.env.IBM_APPLICATION_CREDENTIALS);

const languageTranslator = new LanguageTranslatorV3({
  version: credential.version,
  authenticator: new IamAuthenticator({ apikey: credential.apikey }),
  url: credential.url
});

async function translateTextIBM(content) {
  console.log("[Translate] Starting...");

  for (let [index, file] of content.files.entries()) {
    const texts = file.texts;
    console.log("file: " + (index + 1) + " of " + content.files.length);

    try {
      for (let textIndex = 0; textIndex < texts.length; textIndex++) {
        const translateParams = {
          text: texts[textIndex].original,
          source: content.sourceLanguage,
          target: content.targetLanguage
        };

        const { result } = await languageTranslator.translate(translateParams);

        texts[textIndex].translated = result.translations[0].translation;
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log("[Translate] Finished.");
}

module.exports = {
  translateTextIBM
};
