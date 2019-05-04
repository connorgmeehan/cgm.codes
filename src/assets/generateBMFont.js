const generateBMFont = require('msdf-bmfont-xml');
const fs = require('fs');
const path = require('path');

// font
const thisfont = path.join(__dirname, 'Neustadt-77F.ttf');
console.log(thisfont);

// options

const options = {
  fieldType: 'sdf',
  outputType: "json",
  fontSize: 65,
}

generateBMFont(thisfont, options, (error, textures, font) => {
  if (error) throw error;
  textures.forEach((texture, index) => {
    fs.writeFile(path.join(__dirname, 'font.png'), texture.texture, (err) => {
      if (err) throw err;
    });
  });
  fs.writeFile(path.join(__dirname, 'font.json'), font.data, (err) => {
    if (err) throw err;
  });
});
