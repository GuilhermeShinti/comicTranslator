const fs = require("fs");
const path = require("path");

const contentPath = "./content";
const fileName = "content.json";

function save(folderName, content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(
    path.join(contentPath, folderName, fileName),
    contentString
  );
}

function load(folderName) {
  const fileBuffer = fs.readFileSync(
    path.join(contentPath, folderName, fileName),
    "utf-8"
  );

  return JSON.parse(fileBuffer);
}

module.exports = {
  save,
  load
};
