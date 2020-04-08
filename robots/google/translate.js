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
          {
            from: content.sourceLanguage,
            to: content.targetLanguage
          }
        );
        texts[textIndex].translated = translation;
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.log("[Translate] Finished.");
}

async function detectLanguage(content) {
  const texts = content.files[0].texts.map(text => text.original);
  let [detections] = await translate.detect(texts);
  const detectedLanguages = detections.map(detected => detected.language);
  const reduceLanguages = detectedLanguages.reduce(function(prev, cur) {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  const languagesArray = Object.entries(reduceLanguages);
  const languages = languagesArray.map(a => a[0]);
  const numberOf = languagesArray.map(a => a[1]);

  const maxNumber = getMaxOfArray(numberOf);
  const index = numberOf.findIndex(i => i === maxNumber);

  console.log("Detected Language:", languages[index]);
  content.sourceLanguage = languages[index];
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

module.exports = {
  translateText,
  detectLanguage
};
