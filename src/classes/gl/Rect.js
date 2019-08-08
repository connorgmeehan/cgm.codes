export default class Rect {
    constructor(gl, vertexAttribLocation, x, y, width, height) {
      this.vertexBuffer = gl.createBuffer();
      this.vertexAttribLocation = vertexAttribLocation;
      this.vertices = 
      [ x,        y,        1,
        x+width,  y,        1,
        x+width,  y+height, 1,
        
        x+width,  y+height, 1,
        x,        y+height, 1,
        x,        y,        1];

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
  
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
      gl.vertexAttribPointer(vertexAttribLocation, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    
    draw(gl) {
      gl.scissor(this.x, this.y, this.width, this.height);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(this.vertexAttribLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.vertexAttribLocation);

      gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/3);
    }
  }