require("dotenv").config();

const robots = {
  input: require("./robots/input.js"),
  text: require("./robots/text.js")
};

async function start() {
  const folderName = await robots.input();
  await robots.text(folderName);
}

start();
