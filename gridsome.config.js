// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Connor Guy Meehan Portfolio',
  siteUrl: "https://connorgmeehan.com/",
  siteDescription: "Personal portfolio of works by Connor Guy Meehan, Computing Design student at The University of Sydney and aspiring Creative Technologist!",
  icon: "src/connorgmeehan-favicon.png",
  metaData: {
    siteNameShort: 'CGM',
    heroFeatureText: 'Hello!',
    heroCopyText: 'You\'re viewing the portfolio of a Design Computing student, aspiring Creative Technologist and hopeless speaker of french.',
  },
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post"
      }
    }
  ]
}
