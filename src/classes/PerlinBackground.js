import { ShaderCanvas } from 'shader-canvas';
import clamp from 'clamp';
import EasingFunctions from './easings';
import { fragShaderSource } from '../classes/gl/PerlinShaders_2';
import { signedRandom } from '../helpers/utils';
import Vec3 from './gl/Vec3';
import Color from './Color';
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
    const { lightColor, baseColor, fogColor, padding } = settings;
    this._parent = target; // parent element
    this._padding = padding; // element padding in px
    this._baseColor = new Color().fromHex(baseColor).makeFloat();
    this._lightColor = new Color().fromHex(lightColor).makeFloat();
    this._fogColor = new Color().fromHex(fogColor).makeFloat();
    this._isStopped = false; // stops animation

    // Initialse canvas
    this._shaderCanvas = new ShaderCanvas();
    this._shaderCanvas.setShader(fragShaderSource(this._lightColor, this._baseColor, this._fogColor));
    this._resizeCanvas(target, this._shaderCanvas, this._padding);
    this._shaderCanvas.setUniform('resolution', [this._width, this._height]);
    this._shaderCanvas.domElement.classList.add('PerlinCanvas');
    target.prepend(this._shaderCanvas.domElement);

    // Generate metaballs
    this._metaballs = [];
    const origin = new Vec3([0, 0, 0]);

    for (let i = 0; i < this._settings.metaballCount; i++) {
      // Assign random positions and sizes to metaballs
      const pos = new Vec3([
        signedRandom(-1, 1) * 3.5,
        signedRandom(-1, 1) * 3.5,
        signedRandom(-0.7, 0.7),
      ]);
      const newMetaball = new Metaball(pos, signedRandom(settings.metaballMin, settings.metaballMax));

      // Assign a random velocity to each metaball
      const originDirection = newMetaball.pos.subtract(origin).normalize();
      const orbitDirection = originDirection.rotate(signedRandom(60, 100), signedRandom(60, 100), signedRandom(60, 100));
      newMetaball.velocity = orbitDirection.multiplyAll(signedRandom(7, 12));
      
      // Set metaball size and location in shader
      this._shaderCanvas.setUniform(`metaball${i + 1}`, [newMetaball.pos.x, newMetaball.pos.y, newMetaball.pos.z]); // Pass new data to shader
      this._shaderCanvas.setUniform(`metaball${i + 1}Size`, newMetaball.radius);
      this._metaballs.push(newMetaball);
    }

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
    console.log('resize canvas');
    this._width = parent.clientWidth;
    this._height = parent.clientHeight;
    canvas.domElement.style.left = `-${padding}px`;
    canvas.domElement.style.top = `-${padding}px`;
    canvas.setSize(this._width + padding * 2, this._height + padding * 2);
  }

  _update (now) {
    if (this._isStopped) {
      return;
    }

    // Initialise temporary variables
    const metaballScale = EasingFunctions.easeInOutQuad(clamp(now / 1000, this._settings.metaballGrowTime) / this._settings.metaballGrowTime);
    const origin = new Vec3([0, 0, 0]);
    const gravity = new Vec3([this._settings.gravity, this._settings.gravity, this._settings.gravity]);
    const time = new Vec3([this._settings.time, this._settings.time, this._settings.time]);

    this._metaballs.forEach((metaball, i) => {
      // Difference between metaball and origin, multiply by gravity
      let diff = metaball.pos.subtract(origin);
      diff = diff.multiply(gravity);
      metaball.velocity = metaball.velocity.add(diff);
      const scaledVelocity = metaball.velocity.multiply(time);
      metaball.pos = metaball.pos.subtract(scaledVelocity);
      // Update position and radius (from the metaballScale on load animation)
      this._shaderCanvas.setUniform(`metaball${i + 1}`, [metaball.pos.x, metaball.pos.y, metaball.pos.z]); // Pass new data to shader
      this._shaderCanvas.setUniform(`metaball${i + 1}Size`, metaball.radius * metaballScale); // Pass new data to shader
    });

    // Update mx/my uniforms for orbit effect
    this._lerpedMouseX -= (this._lerpedMouseX - this._mouseHelper.x) / 10;
    this._lerpedMouseY -= (this._lerpedMouseY - this._mouseHelper.y) / 10;
    this._shaderCanvas.setUniform('mx', this._lerpedMouseX * 2);
    this._shaderCanvas.setUniform('my', this._lerpedMouseY * 2);

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
