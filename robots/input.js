const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

const state = require("./state.js");
const { availableTranslateAI } = require("./ai.js");

const contentPath = path.join(__dirname, "..", "content");
const acceptedExtension = [".jpeg", ".jpg", ".png"];

function robot() {
  const content = {};

  const folders = getOnlyFolders();
  const folderName = chooseOneFolder(folders);
  const images = getImages(folderName);

  content.folderName = folderName;
  content.path = contentPath;
  content.translate_ai = askForAItoUse();
  content.sourceLanguage = "";
  content.targetLanguage = askForTargetLanguage();
  content.files = images.map(img => {
    return { name: img, width: 0, height: 0, texts: [] };
  });

  state.save(folderName, content);
  return folderName;
}

function getOnlyFolders() {
  const folders = [];
  const files = fs.readdirSync(contentPath);

  for (const file of files) {
    const stat = fs.lstatSync(path.join(contentPath, file));
    if (stat.isDirectory()) {
      folders.push(file);
    }
  }

  return folders;
}

function chooseOneFolder(folders) {
  const selectedPrefixIndex = readline.keyInSelect(
    folders,
    "Choose a folder: "
  );

  if (selectedPrefixIndex === -1) {
    console.log("Exit...");
    process.exit();
  }

  return folders[selectedPrefixIndex];
}

function getImages(folderName) {
  const validFiles = [];

  const folderPath = path.join(contentPath, folderName);
  const files = fs.readdirSync(folderPath);

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    const currentFile = files[fileIndex];
    const stat = fs.lstatSync(path.join(folderPath, currentFile));
    const extname = path.extname(currentFile);
    const extensionIsValid =
      acceptedExtension.findIndex(ext => ext === extname) > -1;

    if (stat.isFile() && extensionIsValid) {
      validFiles.push(currentFile);
    }
  }

  return validFiles;
}

function askForTargetLanguage() {
  let languageCode = "";
  console.log("Access the link for see the compatibles languages");
  console.log("https://cloud.google.com/translate/docs/languages", "\n");

  while (true) {
    languageCode = readline.question(
      "Enter the language you prefer(ISO-639-1): "
    );
    if (languageCode) break;
  }

  return languageCode;
}

function askForAItoUse() {
  const selectedPrefixIndex = readline.keyInSelect(
    availableTranslateAI,
    "Choose translation AI: "
  );

  if (selectedPrefixIndex === -1) {
    console.log("Exit...");
    process.exit();
  }

  return selectedPrefixIndex;
}

module.exports = robot;
