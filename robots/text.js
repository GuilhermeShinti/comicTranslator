const state = require("./state.js");
const { extractTexts, detectLanguage, translate } = require("./ai.js");

async function robot(folderName) {
  const content = state.load(folderName);

  // TODO: Select image recognition API
  await extractTexts(content);
  state.save(folderName, content);

  await detectLanguage(content);

  await translate[content.translate_ai](content);
  state.save(folderName, content);
}

module.exports = robot;
