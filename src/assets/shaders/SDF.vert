precision mediump float;

attribute vec4 vertex;

uniform mat4 modelview;
uniform mat4 projection;
uniform vec2 uFontSize;
uniform vec2 uResolution;

varying vec2 coord;

uniform float time;

void main() {
  vec4 newVert = vertex;
  // newVert.x *= uResolution.x/uFontSize.x;
  // newVert.x *= 1.5;
  // newVert.y *= uResolution.y/uFontSize.y;  
  coord = newVert.zw;
  gl_Position = projection * modelview * vec4(newVert.xyz, 1);
}