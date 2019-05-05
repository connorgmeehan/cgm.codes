export default class Rect {
  constructor(gl, vertexAttribLocation, x, y, width, height) {
    this.vertexBuffer = gl.createBuffer();
    this.vertexAttribLocation = vertexAttribLocation;
    this.vertices = 
    [ x,        y,
      x+width,  y,
      x+width,  y+height,
      
      x+width,  y+height,
      x,        y+height,
      x,  y];

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexAttribLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
  
  draw(gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(this.vertexAttribLocation, 2, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(this.vertexAttribLocation);
    // console.log(gl.getVertexAttrib(this.vertexAttribLocation, gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING));
    // console.log(this.vertices.length);
    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/2);
  }
}