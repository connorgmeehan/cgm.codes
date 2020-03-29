class ThemeManager {
  themeClassNames = ['Theme__Orange', 'Theme__Blue', 'Theme__Green', 'Theme__Pink'];
  
  constructor() {
    this.documentBody = document.querySelector('body');
  }

  reset() {
    console.debug('ThemeManager.reset()');
    this.selectedThemeClassName = this.themeClassNames[Math.floor(Math.random() * this.themeClassNames.length)];
    console.debug(`ThemeManager.reset() -> selectedThemeClassName: ${this.selectedThemeClassName}`);
    this.documentBody.classList.add(this.selectedThemeClassName);
    this.colorIndicatorElement = document.createElement('div');
    this.colorIndicatorElement.classList.add(this.selectedThemeClassName);
    this.documentBody.append(this.colorIndicatorElement);
  }

  getColor() {
    console.log(window.getComputedStyle(this.colorIndicatorElement).color);
    return window.getComputedStyle(this.colorIndicatorElement).color;
  }
}

export default ThemeManager;