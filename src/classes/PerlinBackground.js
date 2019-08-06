import Color from './Color';
import MetaProgram from './gl/MetaProgram';

import {vertShaderSource, fragShaderSource} from '../classes/gl/PerlinShaders';


class PerlinBackground {
    /**
     *Creates an instance of PerlinBackground.
     * @param {HTMLElement} target
     * @param {String} backgroundColor - as hex
     * @memberof PerlinBackground
     */
    constructor(target, backgroundColor) {
        this._color = new Color().fromHex(backgroundColor).makeFloat();
        // Initialse canvas
        this._canvas = this._buildCanvas(target);
        this._gl = this._initWebGL(target, this._canvas);

        this._metaProgram = new MetaProgram(this._gl, vertShaderSource, fragShaderSource);

        this._bindEvents();
        this._calculateCanvasSize();

        console.log(this);
        this._drawScene(this._gl);
    }

    /**
     * Appends child canvas element to html element
     * @param {HTMLElement} target
     * @returns {HTMLCanvasElement}
     * @memberof PerlinBackground
     */
    _buildCanvas(target) {
        this._parent = target;
        this._canvas = document.createElement('canvas');
        this._canvas.classList.add('PerlinCanvas');
        this._parent.prepend(this._canvas);
        return this._canvas;
    }

    /**
     * Gets WebGL context and sets up widths and heights
     * @param {HTMLCanvasElement} targetCanvas
     * @returns {WebGLRenderingContext}
     * @memberof PerlinBackground
     */
    _initWebGL(parent, targetCanvas) {
        console.log(`WebGLTitle::_initGL(targetCanvas: ${targetCanvas})`);
        console.log(`WebGLTitle::_initGL(targetCanvas: ${targetCanvas})`);
        var gl;

        try {
        var options = {antialias: false, alpha: false, depth: false, stencil: false, preserveDrawingBuffer: false};

        try { var gl = targetCanvas.getContext('experimental-webgl', options); } catch (e) {}
        try { gl = gl || targetCanvas.getContext('webgl', options); } catch (e) {}
        gl = WebGLDebugUtil.makeDebugContext(gl, this.throwOnGLError);

        console.log(`\ttargetCanvas.width: ${targetCanvas.width}, height: ${targetCanvas.height}`);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);

        this._calculateCanvasSize();

        gl.viewport(0, 0, targetCanvas.width, targetCanvas.height);
        gl.clearColor(this._color.r, this._color.g, this._color.b, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        console.log(`\ttargetCanvas.width: ${targetCanvas.width}, height: ${targetCanvas.height}`);


        } catch (e) {
        console.log(`_initCanvas caught on error ${e}`);
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
            return null;
        }

        return gl;
    }

    _bindEvents() {
        document.addEventListener('resize', this._calculateCanvasSize);
    }

    _calculateCanvasSize() {
        // get width and height
        this._width = this._parent.clientWidth;
        this._height = this._parent.clientHeight;

        // update canvas width and height
        this._canvas.width = this._width;
        this._canvas.height = this._height;

        // update canvas width and height
        this._canvas.style.width = this._width;
        this._canvas.style.height = this._height;
    }

    _drawScene(gl) {
        gl.clearColor(this._color.r, this._color.g, this._color.b, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);    
    }
};

export default PerlinBackground;