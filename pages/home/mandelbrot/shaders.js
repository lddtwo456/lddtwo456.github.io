export var shaders = {
  vertexShader: `#version 300 es

    in vec2 aVertexPosition;

    void main() {
      gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    }`,
  fragmentShader: `#version 300 es
    precision highp float;

    uniform vec3 camera;
    uniform ivec2 screen;
    uniform int iterations;
    uniform highp sampler2D referenceIterations;

    out vec4 fragColor;

    vec3 rainbow(float t) {
      vec3 c = vec3(0.0, 2.0/3.0, 1.0/3.0);
      return 0.5 + 0.5 * cos(6.28318 * (t + c));
    }

    void main() {
      int i = 0;
      vec2 d = vec2(0, 0);
      vec2 sampledReference = texture(referenceIterations, vec2(0, 0)).rg;
      vec2 windowSize = 2.0*vec2(screen)/(camera.z*float(screen.y));
      vec2 c = windowSize * (gl_FragCoord.xy - vec2(screen)/2.0) / float(screen.y);
      while(length(d+sampledReference) < 2.0 && i < iterations) {
        sampledReference = texture(referenceIterations, vec2(i, 0)).rg;
        d = 2.0*vec2(sampledReference.x*d.x - sampledReference.y*d.y, sampledReference.x*d.y + sampledReference.y*d.x) + vec2(d.x*d.x - d.y*d.y, 2.0*d.x*d.y) + c;
        d += c;
        i += 1;
      }
      
      vec2 z = texture(referenceIterations, vec2(0, 0)).rg + d;
      float fractionalIterations = float(i) - log(log(length(z)))/log(2.0);

      if (i < iterations) {
        fragColor = vec4(rainbow(fractionalIterations / 50.0), 1.0);
      } else {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    }`
}