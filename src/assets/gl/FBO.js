export default class FBO {
  constructor(gl, canvas) {
    this.canvas = canvas;
    var width = canvas.width;
    var height = canvas.height;
    // var width = 512;
    // var height = 512;
    // Build output texture
    this.texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    
    // Build framebuffer
    this.fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    // bind frame buffer to texture
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

    // unbind everything
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    
    
    console.log(`FBO::contructor() -> done`);
    console.log(`\t framebuffer status ${status}`);
    console.log(this.fbo);
    console.log(this.texture);
  }

  bind(gl) {
    // console.log(`FBO::bind()`);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo); 
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  unbind(gl) {
    // console.log(`FBO::unbind()`);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  getTexture() {
    return this.texture;
  }
} 