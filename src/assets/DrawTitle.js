import {mat4} from 'gl-matrix';
const vsSource = `
attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
`;
const fsSource = `
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;
const warpVert = `
attribute vec4 a_position;
// attribute vec2 a_texcoord;
 
uniform mat4 u_matrix;
 
// varying vec2 v_texcoord;
 
void main() {
   gl_Position = u_matrix * a_position;
  //  v_texcoord = a_texcoord;
}
`;
const warpFrag = `
precision mediump float;
 
varying vec2 v_texcoord;
 
uniform sampler2D u_texture;
 
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(635, 90); 
  gl_FragColor = vec4(1,0,0,0) + vec4(texture2D(u_texture, uv)); 
}
`;
class WebGLTitle {
  constructor(gl, title, background) {
    console.log(`WebGLTitle::constructor(gl: ${gl}, title: ${title}, background: ${background})`)

    this._gl = gl;
    this._title = title;
    this._background = background;

    const shaderProgram = this.buildProgram(vsSource, warpFrag)

    this.getFontTexture(title, 65, "Arial").then((tex0) => {
      console.log("WebGLTitle::contructor() \t -> getFontTexture(...).then((...) => {...})")
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram); 
    
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
      };
      const buffers = this.createPlaneBuffer();
    
      this.drawScene(gl, programInfo, buffers, tex0);
      console.log(tex0);
  
    });  
  }

  createShader(sourceCode, type) {
    console.log(`DrawTitle::createShader(sourceCode ${sourceCode.substr(0,20)}..., type: ${type})`);
    const gl = this._gl;
    
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var info = gl.getShaderInfoLog(shader);
        throw "could not compile web gl shader. \n\n" + info;
    }
  
    return shader;
  }
  
  buildProgram(vertShaderCode, fragShaderCode) {
    console.log(`DrawTitle::buildProgram(vertShaderCode: ${vertShaderCode.substr(0,20)}..., fragShaderCode: ${vertShaderCode.substr(0,20)}...)`);
    const gl = this._gl;

    var vertShader = this.createShader(vertShaderCode, gl.VERTEX_SHADER);  
    var fragShader = this.createShader(fragShaderCode, gl.FRAGMENT_SHADER);
  
    var program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
  
    return program;
  }

  createPlaneBuffer() {
    console.log(`DrawTitle::createPlaneBuffer()`);
    const gl = this._gl;
    // Create a buffer for the square's positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the square.
  
    const positions = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0
    ];
  
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(positions),
                  gl.STATIC_DRAW);
  
    return {
      position: positionBuffer,
      numItems: positionBuffer.length/3,
      itemSize: 3
    };
  }

  async getFontTexture(title, textSize, fontFamily) {
    console.log(`DrawTitle::getFontTexture(title: ${title}, textSize: ${textSize}, fontFamily: ${fontFamily})`)
    const gl = this._gl;

    // Create canvas to draw text
    var canvas = document.createElement('canvas');
    console.log("getFontTexture() \t canvas:", canvas)
    canvas.id = "hiddenCanvas";
    const canvasDims = this.getDimensionsFromFontSize(title, 150);

    console.log(`\t -> {width: ${canvasDims.width}, height: ${canvasDims.height}}`)
    canvas.width  = canvasDims.width;
    canvas.height = canvasDims.height;     
    // canvas.style.display = "none";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas); 
  
    var cubeImage = document.getElementById('hiddenCanvas');
    console.log("\tgetFontTexture() \t cubeImage:", cubeImage)
    var ctx = cubeImage.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);            
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = `${textSize}px ${fontFamily}`;
    ctx.textAlign = 'center';            
    ctx.fillText(title, ctx.canvas.width / 2, ctx.canvas.height / 2 + textSize/2.5);
    ctx.restore();        

    console.log("\tDrawTitle::getFontTexture() -> Texture Made, canvas.data.length", ctx.getImageData(0,0, canvasDims.width, canvasDims.height).data.length);

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array(ctx.getImageData(0,0, canvasDims.width, canvasDims.height).data)); // red
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    // gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  
    return Promise.resolve(texture);
  }

  drawScene(gl, programInfo, buffers, texture) {
    console.log(`DrawTitle::drawScene(gl: ${gl}, programInfo: ${programInfo}, buffers: ${buffers}, texture: ${texture})`);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
  
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
  
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
  
    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [-0.0, 0.0, -0.1]);  // amount to translate
  
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          buffers.itemSize,
          type,
          normalize,
          stride,
          offset);
    }
  
    // Tell WebGL to use our program when drawing  
  
    // // Bind texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);  
    gl.uniform1i( programInfo.samplerUniform, 0 );

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture);
  
  
  
    // Set the shader uniforms
  
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
  
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
  
  getDimensionsFromFontSize (title, textSize) {
    console.log(`DrawTitle::getDimenisonsFromFontSize(title: ${title}, textSize: ${textSize})`)
    return {
      width: textSize * 0.25 * title.length,
      height: textSize * 0.6
    }
  }
  
}

const DrawTitle = (gl, title, background) => {
  console.log(`DrawTitle(gl: ${gl}, title: ${title}, background: ${background})`)

  var texture = getFontTexture(gl, title);
  
  const shaderProgram = buildProgram(gl, vsSource, warpFrag);

}

export default WebGLTitle