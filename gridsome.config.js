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
    technologies: [
      {
        name: 'React',
        icon: 'icon-react',
        link: 'https://reactjs.org/'
      }
    ],
    socials: [
      {
        name: 'Twitter',
        icon: 'icon-twitter',
        link: 'https://twitter.com/connorgm'
      },
      {
        name: 'Github',
        icon: 'icon-github',
        link: 'https://github.com/connorgmeehan'
      }
    ]
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
