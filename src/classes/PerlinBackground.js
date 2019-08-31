import Color from './Color';
import {ShaderCanvas} from 'shader-canvas';
import Vec3 from './gl/Vec3';
import {fragShaderSource} from '../classes/gl/PerlinShaders_2';
import signedRandom from '../helpers/signedRandom';

export const PerlinBackgroundSettings = {
    baseColor: '#999999',
    lightColor: '#DDDDDD',
    fogColor: '#FFFFFF',
    padding: 100,
    metaballCount: 4,
    metaballMin: 0.8,
    metaballMax: 2.2,
    metaBallMaxDistance: 5,
    maxStartingVel: 0.05,
    gravity: 0.01,
    time: 0.001,
};

class Metaball {
    constructor(pos, radius) {
        this.pos = pos;
        console.log(...this.pos.data);
        this.velocity = new Vec3([0,0,0]);
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
        if (!process.isClient) return;
        
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

        const origin = new Vec3([0, 0, -2]);
        
        for (var i = 0; i < this._settings.metaballCount; i++) {
            const pos = new Vec3([
                signedRandom(-.7, .7) * 4,
                signedRandom(-.7, .7) * 4,
                signedRandom(-2, 0),
            ]);
            const newMetaball = new Metaball( pos, signedRandom(settings.metaballMin, settings.metaballMax) );
            
            const originDirection = newMetaball.pos.subtract(origin).normalize();
            const orbitDirection = originDirection.rotate(signedRandom(60,100), 0, signedRandom(0, 180));
            newMetaball.vel = orbitDirection.multiplyAll(signedRandom(0.1, 5));

            this._shaderCanvas.setUniform(`metaball${i+1}`, [newMetaball.pos.x, newMetaball.pos.y, newMetaball.pos.z]); // Pass new data to shader
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
        const origin = new Vec3([0, 0, -2]);
        const gravity = new Vec3([this._settings.gravity, this._settings.gravity, this._settings.gravity]);
        const time = new Vec3([this._settings.time, this._settings.time, this._settings.time]);
        this._metaballs.forEach((metaball, i) => {
            let diff = metaball.pos.subtract(origin);
            diff = diff.multiply(gravity);
            metaball.velocity = metaball.velocity.add(diff);
            let scaledVelocity = metaball.velocity.multiply(time);
            metaball.pos = metaball.pos.subtract(scaledVelocity);
            this._shaderCanvas.setUniform(`metaball${i+1}`, [metaball.pos.x, metaball.pos.y, metaball.pos.z]); // Pass new data to shader
        });
        this._shaderCanvas.render();
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