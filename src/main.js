// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './styles/main.scss';

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router }) {
  if (process.isClient) {
    const getPerlinBackgroundTarget = () => {
      return document.getElementById('Hero_CanvasContainer');
    }
    let perlinBackground;

    // Assign a custom theme for this session
    const documentBody = document.querySelector('body');
    const themeClassNames = ['Theme__Orange', 'Theme__Blue', 'Theme__Green', 'Theme__Pink'];
    const selectedThemeClassName = themeClassNames[Math.floor(Math.random() * themeClassNames.length)]
    documentBody.classList.add(selectedThemeClassName);

    // Client side on page load activities
    router.afterEach(() => {
      Vue.nextTick(() => {
        // Restart animated favicon
        const AnimatedFavicon = require('./classes/AnimatedFavicon').default;
        new AnimatedFavicon('animated_favicon.json');
      
        // Stop or start perlin background if element is found
        const perlinTarget = getPerlinBackgroundTarget();
        if (perlinTarget) {
          const PerlinBackground = require('./classes/PerlinBackground').default;
          const PerlinBackgroundSettings = require('./classes/PerlinBackground').PerlinBackgroundSettings;
          const perlinBackgroundSettings = PerlinBackgroundSettings;
          perlinBackgroundSettings.padding = 50;
        
          console.log(perlinTarget, perlinBackgroundSettings);
  
          perlinBackground = new PerlinBackground(perlinTarget, perlinBackgroundSettings);
          console.log(perlinBackground);
        } else {
          if (perlinBackground) {
            perlinBackground.stop();
          }
          perlinBackground = null;
        }
      })
    });
  }
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
