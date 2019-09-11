# The Axiom Data Science Website

(in development)

[![Netlify Status](https://api.netlify.com/api/v1/badges/ceeaaff5-f44f-4c31-a1db-b6a737123a77/deploy-status)](https://app.netlify.com/sites/axiom-website/deploys)

## Quick start

1. `yarn; yarn develop`

    Note: on windows you may need to do: `yarn --network-concurrency=1; yarn develop`

    Website: `http://localhost:8000`
    Content Management: `http://localhost:8000/admin/`
    GraphQL: `http://localhost:8000/___graphql`

## Content

Content is managed with NetlifyCMS by accessing `http://[site_url]/admin` and stored in markdown files inside of this repository. All markdown files can be found in the `content` directory.

When creating, editing or deleting something through the CMS, it will issue a Git commit and push automatically to the branch you are currently on. This is somewhat strange and difficult to get used to. If you are developing locally and commit using the local CMS at `http://localhost:8000/admin/` **it will still push to the repository**. If you are local and are just testing out new content, please edit the markdown files directly.

## Build Process

The following happens when issuing `yarn build` or automatically when running `yarn develop`. See the Gatsby docs on [lifecycle](https://www.gatsbyjs.org/docs/gatsby-lifecycle-apis/) for more information.

## Pages and URLs

1. All markdown content files in the `content` directory have URLs created for them using attributes in the markdown frontmatter. It tries the following attributes to determine the URL and also uses some custom rules. See the the `onCreateNode` function inside of `gatsby-node.js` for more information.

    1. `slug`
    2. `relslug` (relative slug)
    3. `title`
    4. `name`
    5. `[filename]`
    6. `[directory]`

    Examples:

        * `solutions/technology.md` -> `/solutions/technology`
        * `pages/about.md` -> `/about/`
        * `pages/home.md` => `/`

2. All markdown content files in the `content` directory are parsed into Gatsby nodes using the custom code in the `sourceNodes` function inside of `gatsby-note.js`. This makes the linkages between types of content, for example, between a post and its postCategories. The content is now available through GraphQL.

3. "Pages" are created based on a GraphQL query of the above. Only results with a `template` attribute actually get navigable endpoints. Example pages would be a blog post, an info page, and the about page. It is something with a URL. Some URLs that are parsed in `1.`, such as individual pages for each staff memeber, are not turned into Pages here and are therefore never able to be visited on the site.

**#protip** At any time in development mode you can view a list of accessible pages by visiting a 404 url such as [http://localhost:8000/foo/](http://localhost:8000/foo/).

## Media

All media uploaded to the site through the CMS is stored in the `static/assets` folder. In the future (as discussed on various NetlifyCMS GitHub issues) they may move the uploads to either a nested folder structure, or a relative location along side the markdown content. Right now all individual objects are self-contained markdown files, but at some point they may move to self-contained **folders** for each object, so other things like images can be stored relative to the content they support. Stay tuned. For now all image go into one huge folder. PRs accepted.
