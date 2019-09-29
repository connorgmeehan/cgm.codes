// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './styles/main.scss';

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  if (process.isClient) {
    const getPerlinBackgroundTarget = () => {
      return document.getElementById('Hero_CanvasContainer');
    }
    let perlinBackground;
    let animatedFavicon;
    router.afterEach((to, from) => {
      Vue.nextTick(() => {
        const AnimatedFavicon = require('./classes/AnimatedFavicon').default;
        animatedFavicon = new AnimatedFavicon('animated_favicon.json');
      
        // import PerlinBackground, { PerlinBackgroundSettings } from '../classes/PerlinBackground';
        const PerlinBackground = require('./classes/PerlinBackground').default;
        const PerlinBackgroundSettings = require('./classes/PerlinBackground').PerlinBackgroundSettings;
      
        const perlinTarget = getPerlinBackgroundTarget();
        const perlinBackgroundSettings = PerlinBackgroundSettings;
        perlinBackgroundSettings.padding = 50;
      
        console.log(perlinTarget, perlinBackgroundSettings);
      
        if (perlinTarget) {
          perlinBackground = new PerlinBackground(perlinTarget, perlinBackgroundSettings);
          console.log(perlinBackground);
        } else {
          perlinBackground = null;
        }
      })
    });
  }
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
