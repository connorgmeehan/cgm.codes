class Color {
    fromHex(hex) {
        this.hex = hex;
        hex = hex.replace('#','');
        this.r = parseInt(hex.substring(0,2), 16);
        this.g = parseInt(hex.substring(2,4), 16);
        this.b = parseInt(hex.substring(4,6), 16);
        return this;
    }

    fromRGB(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        this.hex = this.getHex();
        return this;
    }

    fromRGBString(rgbString) {
        const rgbArray = rgbString.replace(/[^\d,]/g, '').split(',');
        return this.fromRGB(rgbArray[0], rgbArray[1], rgbArray[2]);
    }

    getFloat() {
        this.r = this.r/255;
        this.b = this.b/255;
        this.g = this.g/255;
        return this;
    }

    getHex() {
        return '#' + this._componentToHex(this.r) + '' + this._componentToHex(this.g) + '' + this._componentToHex(this.b);
    }

    _componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
}

export default Color;