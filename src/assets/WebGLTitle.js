import MetaProgram from './gl/MetaProgram';
import loadTexture from './gl/loadTexture';
import FontMap from './gl/FontMap';
import FBO from './gl/FBO';
import Rect from './gl/Rect';
const WebGLDebugUtil = require('webgl-debug');

class WebGLTitle {
  constructor(targetCanvas, title, fontData) {
  
    this._gl = this._initGL(targetCanvas);
    this._title = title;

    const vertShaderSource = require(`raw-loader!~/assets/shaders/SDF.vert`).default;
    const fragShaderSource = require(`raw-loader!~/assets/shaders/SDF.frag`).default;

    const vertWarpShaderSource = require(`raw-loader!~/assets/shaders/warp.vert`).default;
    const fragWarpShaderSource = require(`raw-loader!~/assets/shaders/warp.frag`).default;

    // Setup program
    this._gl.getExtension('OES_standard_derivatives');
    this._gl.getExtension('OES_texture_float');

    this.metaProgram = new MetaProgram(this._gl, vertShaderSource, fragShaderSource);
    this.metaProgram.addAttributes(this._gl, "vertex");
    this.metaProgram.addUniforms(this._gl, ["projection", "modelview", "texture", "time", "uFontSize", "uResolution"]);

    this.frameBufferProgram = new MetaProgram(this._gl, vertWarpShaderSource, fragWarpShaderSource);
    this.frameBufferProgram.addAttributes(this._gl, "vertex");
    this.frameBufferProgram.addUniforms(this._gl, ["projection", "modelview", "uResolution", "texture", "time"]);

    // setup fontmap
    this.charTexture = loadTexture(this._gl, "/font.png");
    this.fontMap = new FontMap(fontData);
    
    this._drawScene(this._gl, targetCanvas, this.metaProgram, this.frameBufferProgram, this._title)
  }

  _initGL(targetCanvas) {
    console.log(`WebGLTitle::_initGL(targetCanvas: ${targetCanvas})`);
    var gl;

    try {
      var options = {antialias: false, alpha: false, depth: false, stencil: false, preserveDrawingBuffer: false};

      try { var gl = targetCanvas.getContext('experimental-webgl', options); } catch (e) {}
      try { gl = gl || targetCanvas.getContext('webgl', options); } catch (e) {}
      gl = WebGLDebugUtil.makeDebugContext(gl, this.throwOnGLError);

      console.log(`\ttargetCanvas.width: ${targetCanvas.width}, height: ${targetCanvas.height}`);

      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);

      // Lookup the size the browser is displaying the canvas.
      var displayWidth  = targetCanvas.clientWidth;
      var displayHeight = targetCanvas.clientHeight;

      // Check if the canvas is not the same size.
      if (targetCanvas.width  != displayWidth ||
          targetCanvas.height != displayHeight) {

        // Make the canvas the same size
        targetCanvas.width  = displayWidth;
        targetCanvas.height = displayHeight;
      }

      gl.viewport(0, 0, targetCanvas.width, targetCanvas.height);
      console.log(`\ttargetCanvas.width: ${targetCanvas.width}, height: ${targetCanvas.height}`);


    } catch (e) {
      console.log(`_initCanvas caught on error ${e}`);
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
        return null;
    }

    return gl;
  }
  
  /**
   * Draws the scene.
   *
   * @param {!WebGLRenderingContext) gl The WebGL context.
   * @param {MetaProgram} metaProgram class containing WebGL program + attr/unfiform locations.
   */
  _drawScene(gl, canvas, metaProgram, frameBufferProgram, title) {
    
    // clear scene 
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // use program 
    gl.useProgram(metaProgram.program);
    var totalAdvance = 0;
    var totalWidth = 0;
    // Measure how wide the text is
    for (var i = 0; i < title.length; i++) {
      var thischar = this.fontMap.getChar(title[i]);
  
      totalAdvance += thischar.xadvance;
      totalWidth += thischar.width;
    }
  
    // Center the text at the origin
    var x = -totalAdvance / 2;    // var x = this._gl.canvas.width/2;
    var baseHeight = this.fontMap._data.common.base;
    var y = -baseHeight/2;
    // var y = this._gl.canvas.height/2;
    var tex = {
      width: this.fontMap._data.common.scaleW,
      height: this.fontMap._data.common.scaleH
    };
    console.log(tex);

    // Build character quads
    var vertices = [];
    var font = this.font;
    for(var i = 0; i < title.length; i++) {
      var mychar = this.fontMap.getChar(title[i]);
  
      // p0 --- p1
      // | \     |
      // |   \   |
      // |     \ |
      // p2 --- p3
  
      var coriginX = mychar.xoffset;
      var coriginY = mychar.yoffset;
      var cposX = mychar.x;
      var cposY = mychar.y;
      var cwidth = mychar.width;
      var cheight = mychar.height;
      var fwidth = this.fontMap.getTextureWidth();
      var fheight = this.fontMap.getTextureHeight();
  
      var x0 = x - coriginX;
      var y0 = y - coriginY;
      var s0 = cposX / fwidth;
      var t0 = cposY / fheight;
  
      var x1 = x - coriginX + cwidth;
      var y1 = y - coriginY;
      var s1 = (cposX + cwidth) / fwidth;
      var t1 = cposY / fheight;
  
      var x2 = x - coriginX;
      var y2 = y - coriginY + cheight;
      var s2 = cposX / fwidth;
      var t2 = (cposY + cheight) / fheight;
  
      var x3 = x - coriginX + cwidth;
      var y3 = y - coriginY + cheight;
      var s3 = (cposX + cwidth) / fwidth;
      var t3 = (cposY + cheight) / fheight;
  
      vertices.push(x0, y0, s0, t0);
      vertices.push(x1, y1, s1, t1);
      vertices.push(x3, y3, s3, t3);
  
      vertices.push(x0, y0, s0, t0);
      vertices.push(x3, y3, s3, t3);
      vertices.push(x2, y2, s2, t2);
  
      x += mychar.xadvance;
    }  

    // Use premultiplied alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    
    // initialise character quad buffers as GL
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(metaProgram.attributes.vertex);
    gl.vertexAttribPointer(metaProgram.attributes.vertex, 4, gl.FLOAT, false, 0, 0);
    // Load fontmap textures
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image = new Image;
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    };
    image.src = '/font.png';

    var ratio = window.devicePixelRatio || 1;

    var fbo = new FBO(gl, canvas);

    var rect = new Rect(gl, frameBufferProgram.attributes.vertex, -canvas.width, -canvas.height, canvas.width*2, canvas.height*2);

    var renderCount = 0;
    function frame (now) {
      // 1. Setup variables for frame
      var width = canvas.width;
      var height = canvas.height;

      fbo.bind(gl);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(metaProgram.program);

        var near = 1;
        var far = 1000;
        var top = Math.tan(60 / 2 * Math.PI / 180) * near;
        var right = top * width / height;
        var bottom = -top;
        var left = -right;
        
        gl.uniformMatrix4fv(metaProgram.uniforms.projection, false, [
          2 * near / (right - left), 0, 0, 0,
          0, 2 * near / (top - bottom), 0, 0,
          (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1,
          0, 0, -2 * far * near / (far - near), 0,
        ]);
        gl.uniformMatrix4fv(metaProgram.uniforms.modelview, false, [
          1, 0, 0, 0,
          0, -1, 0, 0,
          1, 0, 1, 0,
          0, 0, -600, 1,
        ]);
        gl.uniform1f(metaProgram.uniforms.time, now);
        gl.uniform2f(metaProgram.uniforms.uFontSize, totalWidth, baseHeight);
        gl.uniform2f(metaProgram.uniforms.uResolution, width, height);

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(metaProgram.attributes.vertex, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(metaProgram.attributes.vertex);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 4);      
      fbo.unbind(gl);

      gl.viewport(0, 0, canvas.width, canvas.height);

      // gl.clearColor(1, 1, 1, 1);
      // gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(frameBufferProgram.program);
      gl.uniformMatrix4fv(frameBufferProgram.uniforms.projection, false, [
        2 * near / (right - left), 0, 0, 0,
        0, 2 * near / (top - bottom), 0, 0,
        (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1,
        0, 0, -2 * far * near / (far - near), 0,
      ]);
      // DRAW FONT INTO FRAME BUFFER
      // gl.enableVertexAttribArray(metaProgram.attributes.vertex);
      // gl.bindTexture(gl.ARRAY_BUFFER, texture);
      gl.uniformMatrix4fv(frameBufferProgram.uniforms.modelview, false, [
        1, 0, 0, 0,
        0, -1, 0, 0,
        1, 0, 1, 0,
        0, 0, -400, 1,
      ]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, fbo.getTexture());
      gl.uniform1i(frameBufferProgram.uniforms.texture, 1);
      gl.uniform1f(frameBufferProgram.uniforms.time, now);
      gl.uniform2f(frameBufferProgram.uniforms.uResolution, width, height);

      rect.draw(gl);
      // if(renderCount < 10) {
        // renderCount++;
        requestAnimationFrame(frame);
      // }
    }

    frame();
  }

  cleanup() {

  }
}

export default WebGLTitle;