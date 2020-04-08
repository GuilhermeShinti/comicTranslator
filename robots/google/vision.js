const path = require("path");
const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function extractTexts(content) {
  console.log("[Extract] Starting...");
  const files = content.files;

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    console.log("file: " + (fileIndex + 1) + " of " + files.length);
    let imagePath = path.join(
      content.path,
      content.folderName,
      files[fileIndex].name
    );

    const [result] = await client.textDetection(imagePath);
    const [page] = result.fullTextAnnotation.pages;

    files[fileIndex].width = page.width;
    files[fileIndex].height = page.height;

    page.blocks.forEach(block => {
      const Text = {
        original: "",
        translated: "",
        ignore: false,
        vertices: block.boundingBox.vertices
      };

      block.paragraphs.forEach(paragraph => {
        let paragraphContent = [];
        paragraph.words.forEach(word => {
          let wordContent = "";
          word.symbols.forEach(symbol => {
            wordContent += symbol.text;
          });
          paragraphContent.push(wordContent);
        });
        Text.original += paragraphContent.join(" ");
      });
      files[fileIndex].texts.push(Text);
    });
  }

  console.log("[Extract] Finished.");
}

module.exports = {
  extractTexts
};
