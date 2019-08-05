// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'connor guy meehan codes, allegedly',
  siteUrl: "https://cgm.codes/",
  siteDescription: "Personal portfolio of works by Connor Guy Meehan, Computing Design student at The University of Sydney and aspiring Creative Technologist!",
  icon: "src/connorgmeehan-favicon.png",
  metaData: {
    contactEmail: 'connorgmeehan23@gmail.com',
    siteNameShort: 'cgm.codes',
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
