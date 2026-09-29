"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.scss";

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uPointer;
  uniform vec2 uVelocity;
  uniform float uTime;
  uniform float uStrength;

  vec2 coverUv(vec2 uv) {
    float screenAspect = uResolution.x / uResolution.y;
    float imageAspect = uImageResolution.x / uImageResolution.y;
    if (imageAspect > screenAspect) {
      uv.x = (uv.x - 0.5) * (screenAspect / imageAspect) + 0.5;
    } else {
      uv.y = (uv.y - 0.5) * (imageAspect / screenAspect) + 0.5;
    }
    return uv;
  }

  void main() {
    float waterMask = smoothstep(0.30, 0.46, vUv.y);
    vec2 ratio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 delta = (vUv - uPointer) * ratio;
    float distanceFromPointer = length(delta);
    vec2 radial = normalize(delta + vec2(0.0001));
    float circularArea = (1.0 - smoothstep(0.08, 0.34, distanceFromPointer)) * smoothstep(0.01, 0.055, distanceFromPointer);
    float falloff = circularArea * waterMask * uStrength;

    vec2 quietWater = vec2(
      sin(vUv.y * 72.0 + uTime * 0.42) * 0.00065,
      cos(vUv.x * 34.0 - uTime * 0.28) * 0.00028
    ) * waterMask;

    float wave = sin(distanceFromPointer * 105.0 - uTime * 3.1);
    float secondaryWave = sin(distanceFromPointer * 58.0 - uTime * 2.0 + 1.2);
    vec2 localWave = radial * (wave * 0.0105 + secondaryWave * 0.0035) * falloff;
    localWave += radial * 0.004 * (1.0 - smoothstep(0.0, 0.12, distanceFromPointer)) * waterMask * uStrength;

    vec2 imageUv = coverUv(vUv + quietWater + localWave);
    vec4 color = texture2D(uTexture, imageUv);
    float shimmer = (wave * 0.5 + 0.5) * 0.085 * falloff;
    color.rgb += shimmer;
    gl_FragColor = color;
  }
`;

function makeShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroWater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !video || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { video.pause(); return; }

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const vertex = makeShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "uResolution");
    const imageResolution = gl.getUniformLocation(program, "uImageResolution");
    const pointer = gl.getUniformLocation(program, "uPointer");
    const velocity = gl.getUniformLocation(program, "uVelocity");
    const time = gl.getUniformLocation(program, "uTime");
    const strength = gl.getUniformLocation(program, "uStrength");
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let frame = 0;
    let targetStrength = 0;
    let currentStrength = 0;
    const currentPointer = { x: 0.5, y: 0.25 };
    const targetPointer = { x: 0.5, y: 0.25 };
    const currentVelocity = { x: 0.01, y: 0 };
    const targetVelocity = { x: 0.01, y: 0 };
    let lastX = 0.5;
    let lastY = 0.25;
    let lastPlayAttempt = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const yFromTop = (event.clientY - rect.top) / rect.height;
      targetPointer.x = x;
      targetPointer.y = 1 - yFromTop;
      const dx = targetPointer.x - lastX;
      const dy = targetPointer.y - lastY;
      const speed = Math.min(Math.hypot(dx, dy) * 20, 1);
      if (speed > .015) { targetVelocity.x = dx; targetVelocity.y = dy; }
      lastX = targetPointer.x; lastY = targetPointer.y;
      targetStrength = yFromTop < 0.74 && event.pointerType !== "touch" ? Math.max(.78, speed) : 0;
    };
    const calm = () => { targetStrength = 0; };

    const start = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.uniform2f(imageResolution, video.videoWidth || 1280, video.videoHeight || 720);
      canvas.classList.add(styles.waterReady);

      const render = (now: number) => {
        resize();
        if (video.paused && now - lastPlayAttempt > 1600) { lastPlayAttempt = now; void video.play().catch(() => undefined); }
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        }
        currentPointer.x += (targetPointer.x - currentPointer.x) * 0.075;
        currentPointer.y += (targetPointer.y - currentPointer.y) * 0.075;
        currentVelocity.x += (targetVelocity.x - currentVelocity.x) * .09;
        currentVelocity.y += (targetVelocity.y - currentVelocity.y) * .09;
        currentStrength += (targetStrength - currentStrength) * (targetStrength > currentStrength ? 0.075 : 0.035);
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform2f(pointer, currentPointer.x, currentPointer.y);
        gl.uniform2f(velocity, currentVelocity.x, currentVelocity.y);
        gl.uniform1f(time, now * 0.001);
        gl.uniform1f(strength, currentStrength);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
    };
    if (video.readyState >= video.HAVE_CURRENT_DATA) start();
    else video.addEventListener("loadeddata", start, { once: true });
    video.playbackRate = .68;
    void video.play().catch(() => undefined);

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", calm);
    window.addEventListener("blur", calm);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", calm);
      window.removeEventListener("blur", calm);
      resizeObserver.disconnect();
      video.removeEventListener("loadeddata", start);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <><video ref={videoRef} className={styles.heroVideo} autoPlay muted loop playsInline preload="auto" poster="/images/hero-ocean.jpg" aria-hidden="true"><source src="/videos/ocean-hero.mp4" type="video/mp4" /></video><canvas ref={canvasRef} className={styles.waterCanvas} aria-hidden="true" /></>;
}
