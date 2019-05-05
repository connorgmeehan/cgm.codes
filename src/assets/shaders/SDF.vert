precision mediump float;
uniform mat4 modelview;
uniform mat4 projection;
attribute vec4 vertex;
varying vec2 coord;

uniform float time;

void main() {
  vec4 newVert = vertex;
  newVert.x = sin(vertex.x/200.+time+300.)*400.;
  newVert.y = vertex.y + sin(vertex.x/200.)*100.;
  coord = newVert.zw;
  gl_Position = projection * modelview * vec4(newVert.xyz, 1);
}