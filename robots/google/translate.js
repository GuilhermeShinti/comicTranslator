const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function translateText(content) {
  console.log("[Translate] Starting...");
  for (let [index, file] of content.files.entries()) {
    const texts = file.texts;
    console.log("file: " + (index + 1) + " of " + content.files.length);

    try {
      for (let textIndex = 0; textIndex < texts.length; textIndex++) {
        const [translation] = await translate.translate(
          texts[textIndex].original,
          content.targetLanguage
        );
        texts[textIndex].translated = translation;
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.log("[Translate] Finished.");
}

module.exports = {
  translateText
};
