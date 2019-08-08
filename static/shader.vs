int marchCount = 100;
float rayCollisionDistance = 0.01;

float smin( float a, float b, float k )
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

vec3 sphere1 = vec3(0., 0., 0.); float sphere1Size = 0.5;
vec3 sphere2 = vec3(0., 0., 0.); float sphere2Size = 0.4;
vec3 sphere3 = vec3(0., 0., 0.); float sphere3Size = 0.3;
vec3 sphere4 = vec3(0., 0., 0.); float sphere4Size = 0.2;
float waveHeight = 0.5;

float map(vec3 rp) {
    float sphere1Dist = distance(rp, sphere1) - sphere1Size;
    float sphere2Dist = distance(rp, sphere2) - sphere2Size;
    float sphere3Dist = distance(rp, sphere3) - sphere3Size;
    float sphere4Dist = distance(rp, sphere4) - sphere4Size;
    float waveScale = clamp(distance(vec2(rp.x, rp.z), vec2(0.0)) * waveHeight, 0.1, 20.);
    float planeDist = (sin(length(vec2(rp.x, rp.z))+iTime)*waveHeight - rp.y) * (cos(length(vec2(rp.x, rp.z))+iTime)*waveHeight - rp.y) - waveScale;
    // float planeDist = length(sin(rp.x / waveScale / 2. + iTime) * cos(rp.z /waveScale/4. + iTime) * waveScale - rp.y) - 0.001;
    return smin(
        smin(
            smin(
                sphere1Dist,
                sphere2Dist,
                0.5
            ),
            smin(
                sphere3Dist,
                sphere4Dist,
                0.5
            ),
            0.5
        ),
        planeDist,
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
    float closest = 99.0;
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
    vec4 fogColor = vec4(.973, .514, .475, 1.0);
    return mix(color, fogColor, fogAmount);
}

// Fresnel
vec4 rimCol = vec4(.973, .514, .475, 1.0);
float rimPow = .7;
float rimAmount = .5;
float F = 2.;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalise screen coords
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv -= 0.5;
    uv.y /= iResolution.x / iResolution.y;

    float t = iTime * 0.25;
    // Update sphere locations
    sphere1 = vec3(sin(t + 0.25), 1. + cos(t), sin(t));
    sphere2 = vec3(cos(t), 1. + cos(t + 0.5), sin(t));
    sphere3 = vec3(sin(t), 1. + cos(t), cos(t + 1.));
    sphere4 = vec3(sin(t), sin(t), sin(t));

    // camera setup
    vec3 upDirection = vec3(0.0, -1.0, 0.0);
    vec3 cameraOrigin = vec3(cos(iMouse.x/iResolution.x + t * 0.25)*5., iMouse.y/iResolution.y * 2. + 2., sin(t * 0.25)*5. + 5.);
    vec3 cameraTarget = vec3(.0);

    vec3 cameraDir = normalize(cameraTarget - cameraOrigin);
    vec3 cameraRight = normalize(cross(upDirection, cameraOrigin));
    vec3 cameraUp = cross(cameraDir, cameraRight);
    
    vec3 rayDir = normalize(cameraRight * uv.x + cameraUp * uv.y + cameraDir); // Ray direction

    vec3 closestPoint = vec3(0);
    float hit = trace(cameraOrigin, rayDir, closestPoint);
    vec4 color = vec4(0.9529, 0.502, 0.4588, 1.0);
    
    // lighting
    vec3 ld = normalize( vec3(14.0, 5.0, -2.0) - cameraOrigin);
    vec3 g = grad(cameraOrigin);

    float d = dot(g, ld);
    d = clamp(d, 0.0, 1.0);

    vec3 r = reflect(-ld, g);
    float rimd = 1.0 - dot(r, -rayDir);
    rimd = clamp(rimd, 0.0, 1.0);
    rimd = pow(rimd, rimPow);

    float frn = rimd + F * (1.0 - rimd);
    color += frn * rimCol * rimAmount * d;

    fragColor = applyFog(color, hit);
}
