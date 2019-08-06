export default class MetaProgram {
      /**
       *Creates an instance of MetaProgram.
       * @param {WebGLRenderingContext} gl - The WebGL context.
       * @param {String} vertShaderSource - The GLSL source code for the vert shader
       * @param {String} fragShaderSource - The GLSL source code for the frag shader
       * @memberof MetaProgram
       */
      constructor(gl, vertShaderSource, fragShaderSource) {
    
        // setup member objects
        this.program = {};
        this._uniforms = {};
        this._attributes = {};
    
        // create a program.
        this.program = gl.createProgram();
    
        // create the shaders
        const fragmentShader = this._compileShader(gl, fragShaderSource, gl.FRAGMENT_SHADER);
        const vertexShader = this._compileShader(gl, vertShaderSource, gl.VERTEX_SHADER);
    
        // attach the shaders.
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
    
        // link the program.
        gl.linkProgram(this.program);
    
        // Check if it linked.
        var success = gl.getProgramParameter(this.program, gl.LINK_STATUS);
        if (!success) {
            // something went wrong with the link
            throw ("program filed to link:" + gl.getProgramInfoLog (this.program));
        }
      }
    
      addAttributes(gl, attributes) {
        console.log(`MetaProgram::addAttributes(gl: ${gl}, attributes: ${attributes}) ->  attributes.length: ${attributes.length}`);
        if(!this.attributes) {
          this.attributes = {};
        }
    
        if(Array.isArray(attributes)) {
          for(var attribute in attributes)
            this.attributes[`${attribute}`] = gl.getAttribLocation(this.program, attribute);
        } else {
            this.attributes[`${attributes}`] = gl.getAttribLocation(this.program, attributes);
        }
        console.log("\tAttributes: ");
        console.log(this.attributes);
      }
    
      addUniforms(gl, uniforms) {
        console.log(`MetaProgram::addUniforms(gl: ${gl}, unforms: ${uniforms}) -> uniforms.length: ${uniforms.length}`);
    
        if(!this.uniforms) {
          this.uniforms = {};
        }
    
        if(Array.isArray(uniforms)) {
          for(var i = 0; i < uniforms.length; i++){
            this.uniforms[`${uniforms[i]}`] = gl.getUniformLocation(this.program, uniforms[i]);
          }
        } else {
          this.uniforms[`${uniforms}`] = gl.getUniformLocation(this.program, uniforms);
        }
    
        console.log("\tUniforms: ");
        console.log(this.uniforms);
    
      }
    
      /**
     * Creates and compiles a shader.
     *
     * @param {!WebGLRenderingContext} gl The WebGL Context.
     * @param {string} shaderSource The GLSL source code for the shader.
     * @param {number} shaderType The type of shader, VERTEX_SHADER or
     *     FRAGMENT_SHADER.
     * @return {!WebGLShader} The shader.
     */
    _compileShader(gl, shaderSource, shaderType) {
      // Create the shader object
      var shader = gl.createShader(shaderType);
    
      // Set the shader source code.
      gl.shaderSource(shader, shaderSource);
    
      // Compile the shader
      gl.compileShader(shader);
    
      // Check if it compiled
      var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!success) {
        // Something went wrong during compilation; get the error
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
      }
    
      return shader;
    }
    
    };