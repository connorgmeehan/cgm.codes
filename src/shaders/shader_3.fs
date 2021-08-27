precision mediump float;

#pragma glslify: pnoise3 = require(./pnoise_3d)

uniform vec2 resolution;
uniform float time;
uniform float mx;
uniform float my;

const float numlayers = 4.;
const float stepsize = 0.1;
const float steplength = numlayers * stepsize;
const float timescale = 0.04;
const float layerdarkness = 0.05;

void main() {
  vec2 uv, p= gl_FragCoord.xy/resolution.xy;
  uv=p;
  p -= 0.1;
  p.x*=resolution.x/resolution.y;

  vec2 muv = vec2(mx, my) / resolution.xy;
  muv.x *= resolution.x/resolution.y;
  muv.y = 1. - muv.y;
  muv = vec2(0.5, 0.5) - muv * 0.1;

  float d = distance(p, muv);
  float invD = 1. - d;
  float n = pnoise3(vec3(p.x * 2., p.y * 2., time * timescale), vec3( 0., 0., 0.)) * 0.2;
  d += n;
  d = clamp(d, 0., steplength);
  float v = smoothstep(0., stepsize, stepsize - mod(d, stepsize));
  v = v * layerdarkness + (1. - layerdarkness);
  gl_FragColor = vec4(v, v, v, 1.);
}
