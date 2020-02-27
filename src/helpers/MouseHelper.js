class MouseHelper {
  x = 0;
  y = 0;
  static instance = null;

  constructor() {
    if(this.instance) {
      return this.instance;
    }
    
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this.isMouseInsideBounds = this.isMouseInsideBounds.bind(this);
    window.addEventListener('mousemove', e => this._handleMouseMove(e));
  }
  /**
   * @param {MouseEvent} event
   * @memberof MouseData
   */
  _handleMouseMove (event) {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  /**
   * isMouseInsideBounds
   * returns true if mouse is inside of HTMLElement
   * @param {HTMLElement} element
   * @returns Boolean
   * @memberof MouseData
   */
  isMouseInsideBounds (element) {
    if (!element) {
      return false;
    }
    const bounds = element.getBoundingClientRect();
    return bounds.left < this.x && this.x < bounds.right &&
    bounds.top < this.y && this.y < bounds.bottom;
  }
}

export default MouseHelper;
