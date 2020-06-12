const _ = require('lodash');
const path = require('path');
const util = require('util');

const setTimeoutPromise = util.promisify(setTimeout);
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

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
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const mdFiles = result.data.allMarkdownRemark.edges;

    const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType');

    _.each(contentTypes, (pages, contentType) => {
      const pagesToCreate = pages.filter((page) => _.get(page, 'node.frontmatter.template'));
      if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`);

      console.log(`Creating ${pagesToCreate.length} ${contentType}`);

      pagesToCreate.forEach((page) => {
        const { id } = page.node;
        createPage({
          // page slug set in md frontmatter
          path: page.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(page.node.frontmatter.template)}.js`,
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        });
      });
    });
  });
};

// sourceNodes instead of onCreateNode so plugins will have created all nodes already
exports.sourceNodes = (
  { actions, getNodesByType, getNode },
) => setTimeoutPromise(2000).then(() => {
  console.log('START sourceNodes');

  const { createNodeField } = actions;

  const markdownNodes = getNodesByType('MarkdownRemark');
  if (markdownNodes.length === 0) {
    return console.log('NOPE: No MarkdownRemark nodes found! Why, oh WHY?');
  }

  //
  // Create relations
  // /
  const getTestimonal = (uid) => getNodesByType('MarkdownRemark').find(
    (node2) => node2.frontmatter.uid === uid,
  );

  const getBlog = (title) => getNodesByType('MarkdownRemark').find(
    (node2) => node2.frontmatter.title === title,
  );

  const getSolutionCategory = (title) => getNodesByType('MarkdownRemark').find(
    (node2) => node2.frontmatter.title === title,
  );

  const postNodes = (title) => getNodesByType('MarkdownRemark').filter(
    (node2) => path.parse(getNode(node2.parent).relativePath).dir === 'posts'
        && node2.frontmatter.blog_categories.map((e) => e.category).indexOf(title) > -1,
  );

  const solutionNodes = (title) => getNodesByType('MarkdownRemark').filter(
    (node2) => path.parse(getNode(node2.parent).relativePath).dir === 'solutions'
        && node2.frontmatter.solution_categories.map((e) => e.category).indexOf(title) > -1,
  );

  markdownNodes.forEach((node) => {
    if (['solutions', 'solutionCategories', 'info', 'pages', 'posts'].indexOf(node.fields.contentType) > -1) {
      if (node.frontmatter.testimonials) {
        let nodeIds = node.frontmatter.testimonials.map((t) => getTestimonal(t.testimonial));
        nodeIds = nodeIds.map((n) => n.id);
        createNodeField({
          node,
          name: 'testimonials',
          value: nodeIds,
        });
        console.log(`Built ${node.fields.contentType} -> testimonials link`);
      }
    }

    // Setup linkage from posts -> blog
    if (node.fields.contentType === 'posts') {
      if (node.frontmatter.blog_categories) {
        let nodeIds = node.frontmatter.blog_categories.map((t) => getBlog(t.category));
        nodeIds = nodeIds.map((n) => n.id);
        createNodeField({
          node,
          name: 'blogs',
          value: nodeIds,
        });
        console.log(`Built ${node.fields.contentType} -> blog link`);
      }
    }

    // // Setup linkage from solution -> solutionCategory
    if (node.fields.contentType === 'solutions') {
      if (node.frontmatter.solution_categories) {
        const nodeIds = node.frontmatter.solution_categories.map((t) => getSolutionCategory(t.category));
        createNodeField({
          node,
          name: 'solutionCategories',
          value: nodeIds.map((n) => n.id),
        });
        console.log(`Built ${node.fields.contentType} -> solutionCategory link`);
      }
    }

    // Setup linkage from blog -> posts
    if (node.fields.contentType === 'blogs') {
      const nodeIds = postNodes(node.frontmatter.title).map((n) => n.id);
      createNodeField({
        node,
        name: 'posts',
        value: nodeIds,
      });
      console.log(`Built ${node.fields.contentType} -> posts link`);
    }

    // Setup linkage from solutionCategories -> solution
    if (node.fields.contentType === 'solutionCategories') {
      const nodeIds = solutionNodes(node.frontmatter.title).map((n) => n.id);
      createNodeField({
        node,
        name: 'solutions',
        value: nodeIds,
      });
      console.log(`Built ${node.fields.contentType} -> solution link`);
    }
  });
  return console.log('END sourceNodes');
});

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // convert frontmatter images
  fmImagesToRelative(node);

  // Create smart slugs based on `slug`, `relslug`, `title` and then finally `name``
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    if (parsedFilePath.name === 'home' && parsedFilePath.dir === 'pages') {
      slug = '/';
    } else if (_.get(node, 'frontmatter.slug')) {
      slug = `/${node.frontmatter.slug.toLowerCase()}/`;
    } else if (_.get(node, 'frontmatter.relslug')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${node.frontmatter.relslug.toLowerCase()}/`;
    } else if (_.get(node, 'frontmatter.title')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(node.frontmatter.title)}/`;
    } else if (_.get(node, 'frontmatter.name')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(node.frontmatter.name)}/`;
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir,
    });

    console.log(`Identified and built the URL: ${slug}`);
  }
};

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json'];
