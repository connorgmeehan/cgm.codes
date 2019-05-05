precision mediump float;

attribute vec4 vertex;

uniform mat4 modelview;
uniform mat4 projection;

void main() {
  gl_Position = projection * modelview * vec4(vertex.xyz, 1);
}