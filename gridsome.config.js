// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'portfolio of connor guy meehan who codes, allegedly',
  siteUrl: 'https://cgm.codes/',
  siteDescription: 'Personal portfolio of works by Connor Guy Meehan, Computing Design student at The University of Sydney and aspiring Creative Technologist!',
  icon: 'assets/favicon.png',
  metadata: {
    contactEmail: 'connorgmeehan23@gmail.com',
    siteNameShort: 'cgmcodes',
    technologies: [
      {
        name: 'Javascript',
        icon: 'icon-js-logo',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/'
      },
      {
        name: 'React',
        icon: 'icon-react-logo',
        link: 'https://reactjs.org/'
      },
      {
        name: 'P5.js',
        icon: 'icon-p5-logo',
        link: 'https://p5js.org/'
      },
      {
        name: 'C++',
        icon: 'icon-cpp-logo',
        link: 'https://isocpp.org/'
      },
      {
        name: 'openFrameworks',
        icon: 'icon-openframeworks-logo',
        link: 'https://openframeworks.cc/'
      },
      {
        name: 'Open CV',
        icon: 'icon-opencv-logo',
        link: 'https://opencv.org/'
      },
      {
        name: 'C#',
        icon: 'icon-c-sharp-logo',
        link: 'https://en.wikipedia.org/wiki/C_Sharp_(programming_language)'
      }
    ],
    socials: [
      {
        name: 'Twitter',
        icon: 'icon-twitter-logo',
        link: 'https://twitter.com/connorgm'
      },
      {
        name: 'Github',
        icon: 'icon-github-logo',
        link: 'https://github.com/connorgmeehan'
      },
      {
        name: 'LinkedIn',
        icon: 'icon-linkedin-logo',
        link: 'https://www.linkedin.com/in/connorgmeehan/'
      },
      {
        name: 'Resume',
        icon: 'icon-resume-logo',
        link: 'https://cgm.codes/connor_guy_meehan_cv_creative_technologist.pdf'
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Post', // Required
        baseDir: './blog', // Where .md files are located
        pathPrefix: '/works', // Add route prefix. Optional
        template: './src/templates/Post.vue' // Optional
      }
    },
  ],
  transformers: {
    remark: {

    }
  }
}
