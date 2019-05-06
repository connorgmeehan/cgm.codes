export default class FontMap {
  constructor(data) {
    this._data = data;
    this.widest = data.chars.reduce((acc, el) => (el.width < acc.width ? acc : el));
    this.tallest = data.chars.reduce((acc, el) => (el.height < acc.height ? acc : el));
    console.log(data);
  }

  getChar(char) {
    return this._data.chars.find(x => x.char == char);
  }

  getWordWidth(word) {
    var width = 0;
    for(var i = 0; i < word.length; i++) {
      width += this.getChar(word[i]).xadvance;
    }
    return width;
  }

  getFontHeight() {
    return this._data.info.size;
  }

  getTextureWidth() {
    return this._data.common.scaleW
  }

  getTextureHeight() {
    return this._data.common.scaleH
  }
}