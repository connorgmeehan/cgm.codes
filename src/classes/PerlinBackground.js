import Color from './Color';
import {ShaderCanvas} from 'shader-canvas';
import { vec3 } from "gl-matrix";
import {fragShaderSource} from '../classes/gl/PerlinShaders_2';
import signedRandom from '../helpers/signedRandom';

export const PerlinBackgroundSettings = {
    baseColor: '#999999',
    lightColor: '#DDDDDD',
    fogColor: '#FFFFFF',
    padding: 100,
    metaballCount: 4,
    metaballMin: 0.3,
    metaballMax: 0.5,
    gravity: 200,
};

class Metaball {
    constructor(x, y, z, radius) {
        console.log(x,y,z);
        this.pos = vec3.fromValues(x,y,z);
        console.log(...this.pos);
        this.velocity = vec3.fromValues(signedRandom(-0.05, 0.05), signedRandom(-0.05, 0.05), signedRandom(-0.05, 0.05));
        this.radius = radius;
    }
};

class PerlinBackground {
    /**
     *Creates an instance of PerlinBackground.
     * @param {HTMLElement} target
     * @param {String} backgroundColor - as hex
     * @memberof PerlinBackground
     */
    constructor(target, settings) {
        this._settings = settings;
        const { lightColor, baseColor, fogColor, padding } = settings;
        this._parent = target;
        this._padding = padding;
        this._baseColor = new Color().fromHex(baseColor).makeFloat();
        this._lightColor = new Color().fromHex(lightColor).makeFloat();
        this._fogColor = new Color().fromHex(fogColor).makeFloat();
        
        // Initialse canvas
        this._shaderCanvas = new ShaderCanvas;
        this._shaderCanvas.setShader(fragShaderSource(this._lightColor, this._baseColor, this._fogColor));
        this._resizeCanvas(target, this._shaderCanvas, this._padding);
        this._shaderCanvas.setUniform('resolution', [this._width, this._height]);
        this._shaderCanvas.domElement.classList.add('PerlinCanvas');
        target.prepend(this._shaderCanvas.domElement);

        // Generate metaballs
        this._metaballs = [];
        console.log(this);
        for (var i = 0; i < this._settings.metaballCount; i++) {
            const newMetaball = new Metaball(
                signedRandom(settings.metaballMin, settings.metaballMax) * 5.0,
                signedRandom(settings.metaballMin, settings.metaballMax) * 5.0,
                signedRandom(settings.metaballMin, settings.metaballMax) * 5.0,
                signedRandom(settings.metaballMin, settings.metaballMax)
            );
            this._shaderCanvas.setUniform(`metaball${i+1}`, [newMetaball.pos[0], newMetaball.pos[1], newMetaball.pos[2]]); // Pass new data to shader
            this._shaderCanvas.setUniform(`metaball${i+1}Size`, newMetaball.radius);
            this._metaballs.push(newMetaball);
        }

        console.log(this._metaballs);

        // 
        this._bindEvents();
        this._shaderCanvas.render();

        this._update.bind(this);
        requestAnimationFrame(now => this._update(now));
    }

    _bindEvents() {
        window.addEventListener('resize', (e) => {
            this._resizeCanvas(this._parent, this._shaderCanvas, this._padding);
        }, false);
    }

    /**
     * _resizeCanvas - resizes the canvas size, useful on window resize
     * @param {HTMLElement} parent
     * @param {ShaderCanvas} canvas
     * @param {Number} padding
     * @memberof PerlinBackground
     */
    _resizeCanvas(parent, canvas, padding) {
        this._width = parent.clientWidth;
        this._height = parent.clientHeight;
        canvas.domElement.style.left = `-${padding}px`;
        canvas.domElement.style.top = `-${padding}px`;
        canvas.setSize(this._width + padding * 2, this._height + padding * 2);
    }

    _update(now) {
        const origin = new vec3.fromValues(0, 0, 0);
        const gravity = new vec3.fromValues(this._settings.gravity, this._settings.gravity, this._settings.gravity);
        this._metaballs.forEach((metaball, i) => {
            let diff = vec3.create();
            vec3.subtract(diff, metaball.pos, origin); // Direct vector to origin
            vec3.multiply(diff, diff, gravity); // Scale by gravity
            vec3.subtract(metaball.velocity, metaball.velocity, diff); // Adjust metaball velocity
            vec3.subtract(metaball.pos, metaball.pos, metaball.velocity); // Update metaball position
            this._shaderCanvas.setUniform(`metaball${i+1}`, [metaball.pos[0], metaball.pos[1], metaball.pos[2]]); // Pass new data to shader
        });
        this._shaderCanvas.setUniform('time', now / 1000); // Pass new data to shader
        requestAnimationFrame(now => this._update(now));
    }

    /**
     * kill
     * destroys gl instance and deletes HTMLElement
     * @memberof PerlinBackground
     */
    kill() {
    }
};

export default PerlinBackground;