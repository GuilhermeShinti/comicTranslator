# ComicTranslator

Extract and Translate texts of comics and mangas pages using AI.

Compatibles formats: '.jpeg', '.jpg', '.png'.
For add more formats to test just, increase in acceptedExtension on the file 'robots/input.js'

### How to use

Install

```
yarn install
```

Put the google JSON key inside 'credentials' folder.

Put the folder images of manga or comic inside '/content' and run.

example:

```
content
└───SUPERMAN_VOL1
│   │   1.jpeg
│   │   2.jpeg
│   │   ...
```

Run

```
yarn start
```

After run is generated 'content.json' inside manga or comic folder with original and translated texts, position and more info.
