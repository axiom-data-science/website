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

  mapping: {
    'MarkdownRemark.fields.posts': `MarkdownRemark`,
    'MarkdownRemark.fields.blogs': `MarkdownRemark`,
    'MarkdownRemark.fields.solutions': `MarkdownRemark`,
    'MarkdownRemark.fields.testimonials': `MarkdownRemark`,
    'MarkdownRemark.fields.solutionCategories': `MarkdownRemark`,
  },

  plugins: [
    `gatsby-transformer-yaml`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
        name: 'assets'
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `pages`
      }
    },

    // Images
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1500
            },
          },
          // {
          //   resolve: `gatsby-remark-responsive-iframe`,
          //   options: {
          //     wrapperStyle: `margin-bottom: 1.0725rem`,
          //   },
          // },
          `gatsby-remark-prismjs`,
          // {
          //   resolve:`gatsby-remark-copy-linked-files`,
          //   options:{
          //     destinationDir:`${__dirname}/static`
          //   }
          // },
          `gatsby-remark-smartypants`,
        ],
      },
    },

    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,

    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false
      }
    },

    `gatsby-plugin-sitemap`,

    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },

    `gatsby-plugin-netlify`

  ]
}
