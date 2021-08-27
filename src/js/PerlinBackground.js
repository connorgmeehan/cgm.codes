import { ShaderCanvas } from 'shader-canvas';
import fragShaderSource from '../shaders/shader_3.fs';
import Vec3 from './gl/Vec3';
import MouseHelper from '../helpers/MouseHelper';

export const PerlinBackgroundSettings = {
  baseColor: '#999999',
  lightColor: '#DDDDDD',
  fogColor: '#FFFFFF',
  padding: 100,
  metaballCount: 4,
  metaballMin: 0.8,
  metaballMax: 1.8,
  metaBallMaxDistance: 5,
  metaballGrowTime: 2,
  maxStartingVel: 0.05,
  gravity: 0.01,
  time: 0.0003
};

class Metaball {
  constructor (pos, radius) {
    this.pos = pos;
    console.log(...this.pos.data);
    this.velocity = new Vec3([0, 0, 0]);
    this.radius = radius;
  }
}

class PerlinBackground {
  /**
     *Creates an instance of PerlinBackground.
     * @param {HTMLElement} target
     * @param {String} backgroundColor - as hex
     * @memberof PerlinBackground
     */
  constructor (target, settings) {
    if (!process.isClient) { return; }

    // Initialise mouse helper and variables to control interactivty
    this._mouseHelper = new MouseHelper();
    this._lerpedMouseX = 0;
    this._lerpedMouseY = 0;

    // Initialise light and color settings
    this._settings = settings;
    const { padding } = settings;
    this._parent = target; // parent element
    this._padding = padding; // element padding in px
    this._isStopped = false; // stops animation

    // Initialse canvas
    this._shaderCanvas = new ShaderCanvas();
    this._shaderCanvas.setShader(fragShaderSource);
    this._resizeCanvas(target, this._shaderCanvas, this._padding);
    this._shaderCanvas.domElement.classList.add('PerlinCanvas');
    target.prepend(this._shaderCanvas.domElement);

    console.log(this._metaballs);

    // initialise required events and start the canvas rendering
    this._bindEvents();
    this._shaderCanvas.render();

    // start animation/update loop
    this._update.bind(this);
    requestAnimationFrame(now => this._update(now));
  }

  _bindEvents () {
    // Listener to resize the canvas when the window size changes to make the canvas responsive.
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      // debouncing to avoid poor performance when resizing
      resizeTimeout = setTimeout(() => {
        this._resizeCanvas(this._parent, this._shaderCanvas, this._padding);
      }, 100);
    }, false);
  }

  /**
     * _resizeCanvas - resizes the canvas size, useful on window resize
     * @param {HTMLElement} parent
     * @param {ShaderCanvas} canvas
     * @param {Number} padding
     * @memberof PerlinBackground
     */
  _resizeCanvas (parent, canvas, padding) {
    this._width = parent.clientWidth;
    this._height = parent.clientHeight;
    console.log('resize canvas', this._width, this._height);
    canvas.domElement.style.left = `-${padding}px`;
    canvas.domElement.style.top = `-${padding}px`;
    canvas.setSize(this._width + padding * 2, this._height + padding * 2);
    this._shaderCanvas.setUniform('resolution', canvas.getResolution());
  }

  _update (now) {
    if (this._isStopped) {
      return;
    }
    // Update mx/my uniforms for orbit effect
    this._lerpedMouseX -= (this._lerpedMouseX - this._mouseHelper.x) / 10;
    this._lerpedMouseY -= (this._lerpedMouseY - this._mouseHelper.y) / 10;
    const bb = this._shaderCanvas.domElement.getBoundingClientRect();
    this._shaderCanvas.setUniform('mx', (this._lerpedMouseX - bb.left) * window.devicePixelRatio);
    this._shaderCanvas.setUniform('my', (this._lerpedMouseY - bb.top) * window.devicePixelRatio);

    this._shaderCanvas.setUniform('time', now / 1000);

    // render and set next frame render 
    this._shaderCanvas.render();
    requestAnimationFrame(now => this._update(now));
  }

  // Kills the draw loop animation, used when navigating to a different page
  stop () {
    this._isStopped = true;
    this._parent.removeChild(this._shaderCanvas.domElement);
  }

  /**
     * kill
     * destroys gl instance and deletes HTMLElement
     * @memberof PerlinBackground
     */
  kill () {
  }
}

export default PerlinBackground;
