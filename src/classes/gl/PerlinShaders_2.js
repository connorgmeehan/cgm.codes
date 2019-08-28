export const fragShaderSource = (lightingColor, baseColor, fogColor) => `
precision mediump float;
const int marchCount = 100;
const float rayCollisionDistance = 0.0005;

vec4 lightingColor = vec4(${lightingColor.r}, ${lightingColor.g}, ${lightingColor.b}, 1.0);
vec4 baseColor = vec4(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1.0);
vec4 fogColor = vec4(${fogColor.r}, ${fogColor.g}, ${fogColor.b}, 1.0);
uniform vec2 resolution;
uniform float time;

float smin( float a, float b, float k )
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

uniform vec3  metaball1; 
uniform float metaball1Size;
uniform vec3  metaball2; 
uniform float metaball2Size;
uniform vec3  metaball3; 
uniform float metaball3Size;
uniform vec3  metaball4;
uniform float metaball4Size;

float map(vec3 rp) {
    float metaball1Dist = distance(rp, metaball1) - metaball1Size;
    float metaball2Dist = distance(rp, metaball2) - metaball2Size;
    float metaball3Dist = distance(rp, metaball3) - metaball3Size;
    float metaball4Dist = distance(rp, metaball4) - metaball4Size;
    return smin(
        smin(
            metaball1Dist,
            metaball2Dist,
            0.5
        ),
        smin(
            metaball3Dist,
            metaball4Dist,
            0.5
        ),
        0.5
    );
}

vec3 grad(in vec3 rp)
{
    vec2 off = vec2(0.0001, 0.0);
    vec3 g = vec3(map(rp + off.xyy) - map(rp - off.xyy),
                  map(rp + off.yxy) - map(rp - off.yxy),
                  map(rp + off.yyx) - map(rp - off.yyx));
    return normalize(g);
}

float trace(inout vec3 rp, in vec3 rd, inout vec3 closestPoint) {
    float closest = .1;
    float maxDist = 200.0;
    for(int i = 0; i < marchCount; i++) {
        float dist = map(rp);

        if (dist < closest) {
            closest = dist;
            closestPoint = rp;
        }

        if(dist < 0.0 || dist > maxDist) {
            return dist;
        }

        rp += rd * max(dist * 0.5, rayCollisionDistance);
    }
}
float density = 20.;
vec4 applyFog(vec4 color, float dist) {
    float fogAmount = 1.0 - clamp(exp(-density * dist), 0.0, 1.0);
    return mix(color, fogColor, fogAmount);
}

// Fresnel
float rimPow = .7;
float rimAmount = .5;
float F = 2.;
vec4 applyLighting(vec4 color, vec3 cameraOrigin, vec3 rayDir) {
    vec3 ld = normalize( vec3(14.0, 5.0, -2.0) - cameraOrigin);
    vec3 g = grad(cameraOrigin);

    float d = dot(g, ld);
    d = clamp(d, 0.0, 1.0);

    vec3 r = reflect(-ld, g);
    float rimd = 1.0 - dot(r, -rayDir);
    rimd = clamp(rimd, 0.0, 1.0);
    rimd = pow(rimd, rimPow);

    float frn = rimd + F * (1.0 - rimd);
    return color + frn * lightingColor * rimAmount * d;
}

void main() {
    // Normalise screen coords
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= 0.5;
    uv.y /= resolution.x / resolution.y;

    float t = time * 0.25;

    // camera setup
    vec3 upDirection = vec3(0.0, -1.0, 0.0);
    vec3 cameraOrigin = vec3(cos(t * 0.25)*5., 5., sin(t * 0.25)*5. + 5.);
    vec3 cameraTarget = vec3(.0);

    vec3 cameraDir = normalize(cameraTarget - cameraOrigin);
    vec3 cameraRight = normalize(cross(upDirection, cameraOrigin));
    vec3 cameraUp = cross(cameraDir, cameraRight);
    
    vec3 rayDir = normalize(cameraRight * uv.x + cameraUp * uv.y + cameraDir); // Ray direction

    vec3 closestPoint = vec3(0);
    float hit = trace(cameraOrigin, rayDir, closestPoint);
    // lighting
    vec4 color = applyLighting(baseColor, cameraOrigin, rayDir);
    gl_FragColor = applyFog(color, hit);
}

`;

export const vertShaderSource = `
precision mediump float;

attribute vec4 vertex;

uniform mat4 modelview;
uniform mat4 projection;

void main() {
  gl_Position = projection * modelview * vec4(vertex.xyz, 1);
}
`;