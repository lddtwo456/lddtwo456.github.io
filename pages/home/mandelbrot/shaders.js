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

    out vec4 fragColor;

    vec3 rainbow(float t) {
      vec3 c = vec3(0.0, 2.0/3.0, 1.0/3.0);
      return 0.5 + 0.5 * cos(6.28318 * (t + c));
    }

    void main() {
      int i = 0;
      vec2 z = vec2(0, 0);
      vec2 windowSize = 2.0*vec2(screen)/(camera.z*float(screen.y));
      vec2 c = camera.xy + (windowSize * (gl_FragCoord.xy - vec2(screen)/2.0) / float(screen.y));
      while(length(z) < 2.0 && i < iterations) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y);
        z += c;
        i += 1;
      }

      float fractionalIterations = float(i) - log(log(length(z)))/log(2.0);

      if (i < iterations) {
        fragColor = vec4(rainbow(fractionalIterations / 50.0), 1.0);
      } else {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    }`
}