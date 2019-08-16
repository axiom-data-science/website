const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              template
              title
            }
            fields {
              slug
              contentType
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const mdFiles = result.data.allMarkdownRemark.edges

    const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')

    _.each(contentTypes, (pages, contentType) => {
      const pagesToCreate = pages.filter(page =>
        // get pages with template field
        _.get(page, `node.frontmatter.template`)
      )
      if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

      console.log(`Creating ${pagesToCreate.length} ${contentType}`)

      pagesToCreate.forEach((page, index) => {
        const id = page.node.id
        createPage({
          // page slug set in md frontmatter
          path: page.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(page.node.frontmatter.template)}.js`
          ),
          // additional data can be passed via context
          context: {
            id
          }
        })
      })
    })
  })
}

// sourceNodes instead of onCreateNode so plugins will have created all nodes already
exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions
  //
  // Create relations

  // // solutions -> testimonials
  // testimonialsOfSolutions = {}
  // // solutionCategories -> testimonials
  // testimonialsOfSolutionCategories = {}
  // // info -> testimonials
  // testimonialsOfInfo = {}
  // // home -> testimonials
  // testimonialsOfHome = {}
  // solutionCategory -> solution
  // solutionsOfSolutionCategory = {}
  // blogs -> posts
  // postsOfBlogs = {}

  const getTestimonal = uid => getNodes().find(
    node2 =>
      node2.internal.type === `MarkdownRemark` &&
      node2.frontmatter.uid === uid
  )

  const getBlog = title => getNodes().find(
    node2 =>
      node2.internal.type === `MarkdownRemark` &&
      node2.frontmatter.title === title
  )

  const getSolutionCategory = title => getNodes().find(
    node2 =>
      node2.internal.type === `MarkdownRemark` &&
      node2.frontmatter.title === title
  )

  const postNodes = title => getNodes().filter(
    node2 =>
      node2.internal.type === `MarkdownRemark` &&
      path.parse(getNode(node2.parent).relativePath).dir == 'posts' &&
      node2.frontmatter.blog_categories.map(e => e.category).indexOf(title) > -1
  )

  const solutionNodes = title => getNodes().filter(
    node2 =>
      node2.internal.type === `MarkdownRemark` &&
      path.parse(getNode(node2.parent).relativePath).dir == 'solutions' &&
      node2.frontmatter.solution_categories.map(e => e.category).indexOf(title) > -1
  )

  // iterate thorugh all markdown nodes to link books to author
  // and build author index
  const markdownNodes = getNodes()
    .filter(node => node.internal.type === `MarkdownRemark`)
    .forEach(node => {

      const fileNode = getNode(node.parent)
      const parsedFilePath = path.parse(fileNode.relativePath)

      // If testimonials is defined in the front matter match them to
      // uids of testimonmials and return the ID for gatsby to do the
      // mapping itself. There is no reverse mapping for testimonials.
      if (['solutions', 'solutionCategories', 'info', 'pages', 'posts'].indexOf(node.fields.contentType) > -1) {
        if (node.frontmatter.testimonials) {
          let nodeIds = node.frontmatter.testimonials.map(t => getTestimonal(t.testimonial) )
          nodeIds = nodeIds.map(n => n.id )
          createNodeField({
            node: node,
            name: `testimonials`,
            value: nodeIds,
          })
        }
      }

      // Setup linkage from posts -> blog
      if (node.fields.contentType === 'posts') {
        if (node.frontmatter.blog_categories) {
          let nodeIds = node.frontmatter.blog_categories.map(t => getBlog(t.category) )
          nodeIds = nodeIds.map(n => n.id )
          createNodeField({
            node: node,
            name: `blogs`,
            value: nodeIds,
          })
        }
      }

      // // Setup linkage from solution -> solutionCategory
      if (node.fields.contentType === 'solutions') {
        if (node.frontmatter.solution_categories) {
          let nodeIds = node.frontmatter.solution_categories.map(t => getSolutionCategory(t.category) )
          nodeIds = nodeIds.map(n => n.id )
          createNodeField({
            node: node,
            name: `solutionCategories`,
            value: nodeIds,
          })
        }
      }

      // Setup linkage from blog -> posts
      if (node.fields.contentType === 'blogs') {
        let nodeIds = postNodes(node.frontmatter.title).map(n => n.id);
        createNodeField({
          node: node,
          name: `posts`,
          value: nodeIds,
        })
      }

      // Setup linkage from solutionCategories -> solution
      if (node.fields.contentType === 'solutionCategories') {
        let nodeIds = solutionNodes(node.frontmatter.title).map(n => n.id);
        createNodeField({
          node: node,
          name: `solutions`,
          value: nodeIds,
        })
      }

    })

  return

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // convert frontmatter images
  fmImagesToRelative(node)

  // Create smart slugs based on `slug`, `relslug`, `title` and then finally `name``
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (parsedFilePath.name === 'home' && parsedFilePath.dir === 'pages') {
      slug = `/`
    } else if (_.get(node, 'frontmatter.slug')) {
      slug = `/${node.frontmatter.slug.toLowerCase()}/`
    } else if (_.get(node, 'frontmatter.relslug')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${node.frontmatter.relslug.toLowerCase()}/`
    } else if (_.get(node, 'frontmatter.title')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(node.frontmatter.title)}/`
    } else if (_.get(node, 'frontmatter.name')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(node.frontmatter.name)}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir
    })
  }
}

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json']
