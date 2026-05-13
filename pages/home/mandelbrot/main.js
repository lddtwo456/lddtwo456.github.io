import { shaders } from "./shaders.js";
import BigNumber from "https://cdn.jsdelivr.net/npm/bignumber.js@latest/+esm"

main();

function main() {
  const canvas = document.querySelector("#gl-canvas");
  const gl = canvas.getContext("webgl2");

  if (gl === null) {
    alert("woops :(");
    return;
  }

  const shaderProgram = initShaderProgram(gl, shaders.vertexShader, shaders.fragmentShader);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
      camera: gl.getUniformLocation(shaderProgram, "camera"),
      screen: gl.getUniformLocation(shaderProgram, "screen"),
      iterations: gl.getUniformLocation(shaderProgram, "iterations"),
    },
  };

  const vertBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
  const verts = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

  // First draw
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  gl.useProgram(programInfo.program);
  
  let camera = [new BigNumber(-0.75), new BigNumber(0.0), 1.0];
  drawScreen(gl, programInfo, camera, [canvas.clientWidth, canvas.clientHeight], 1000);

  // Set up inputs
  let mouseCenter = [new BigNumber(0.0), new BigNumber(0.0)];
  canvas.addEventListener("mousemove", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    const centerRelative = [x - canvas.clientWidth/2, -1*(y - canvas.clientHeight/2)];
    const windowSize = [new BigNumber(canvas.clientWidth).dividedBy(camera[2]*canvas.clientHeight/2), new BigNumber(canvas.clientHeight).dividedBy(camera[2]*canvas.clientHeight/2)]
    const mouseGraphPos = [camera[0].plus(windowSize[0].multipliedBy(centerRelative[0] / canvas.clientHeight)), camera[1].plus(windowSize[1].multipliedBy(centerRelative[1] / canvas.clientHeight))];

    mouseCenter = mouseGraphPos;
  });
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();

    const dY = e.deltaY;
    const mouseToCenter = [camera[0].minus(mouseCenter[0]), camera[1].minus(mouseCenter[1])];
    const zoom = Math.exp(-dY/500)

    camera[0] = camera[0].minus(mouseToCenter[0].multipliedBy(Math.log(zoom)));
    camera[1] = camera[1].minus(mouseToCenter[1].multipliedBy(Math.log(zoom)));
    camera[2] *= zoom;
    drawScreen(gl, programInfo, camera, [canvas.clientWidth, canvas.clientHeight], 1000);
  });
}

function drawScreen(gl, programInfo, camera, screen, iterations) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.uniform3fv(programInfo.uniformLocations.camera, camera);
  gl.uniform2iv(programInfo.uniformLocations.screen, screen);
  gl.uniform1i(programInfo.uniformLocations.iterations, iterations);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `Woops didn't compile: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        program,
      )}`,
    );
    return null;
  }

  return program;
}

function draw(gl, programInfo, buffers) {
  gl.clear(gl.COLOR_BUFFER_BIT);

}
