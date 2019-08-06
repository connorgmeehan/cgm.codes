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

        this.hex = '#' + this._componentToHex(r) + this._componentToHex(g) + this._componentToHex(b);
        return this;
    }

    makeFloat() {
        this.r = this.r/255;
        this.b = this.b/255;
        this.g = this.g/255;
        return this;
    }

    _componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
}

export default Color;