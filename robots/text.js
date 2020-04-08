const state = require("./state.js");
const { extractTexts } = require("./google/vision.js");
const { translateText } = require("./google/translate.js");

async function robot(folderName) {
  const content = state.load(folderName);

  // TODO: Select image recognition API
  await extractTexts(content);
  state.save(folderName, content);

  // TODO: Select text translation API
  await translateText(content);
  state.save(folderName, content);
}

module.exports = robot;
