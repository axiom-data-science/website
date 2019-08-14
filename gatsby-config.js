/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {

  siteMetadata: {
    title: 'Axiom Data Science',
    siteUrl: 'https://axiom-website.netlify.com/'
  },

  plugins: [
    'gatsby-plugin-react-helmet',

    'gatsby-transformer-yaml',

    // Convert files (JSON, Markdown) to React objects we can use in components
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets`,
        name: 'assets'
      }
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },

    // Images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800
            },
          },
        ],
      },
    },

    'gatsby-plugin-sass',

    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false
      }
    },

    'gatsby-plugin-sitemap',

    'gatsby-plugin-netlify-cms',

    'gatsby-plugin-netlify'

  ]
}
