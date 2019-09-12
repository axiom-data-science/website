import React from 'react';
import { StaticQuery, graphql } from "gatsby"

export default ({}) => {
  return (
    <StaticQuery
      query={graphql`
        query HeaderQuery {

          pages: allMarkdownRemark(
            filter: {
              fields: { contentType: { eq: "pages" } }
              frontmatter: { display: { in: ["Menu"] } }
            }
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                fields { slug }
                frontmatter { title }
              }
            }
          }
          
          solutionCategories: allMarkdownRemark(
            filter: {
              fields: { contentType: { eq: "solutionCategories" } }
              frontmatter: { display: { in: ["Menu"] } }
            }
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                fields { slug }
                frontmatter { title }
              }
            }
          }

          blogs: allMarkdownRemark(
            filter: {
              fields: { contentType: { eq: "blogs" } }
              frontmatter: { display: { in: ["Menu"] } }
            }
            sort: { order: ASC, fields: [frontmatter___title] }
          ) {
            edges {
              node {
                fields { slug }
                frontmatter { title }
              }
            }
          }
        }
      `}
      render={data => {

        const nav = {
          pages: data.pages.edges.map(p => {
            return { ...p.node.fields, ...p.node.frontmatter }
          }),
          blogs: data.blogs.edges.map(blog => {
            return { ...blog.node.fields, ...blog.node.frontmatter }
          }),
          categories: data.solutionCategories.edges.map(sol => {
            return { ...sol.node.fields, ...sol.node.frontmatter }
          })
        }

        return (
          <div>
            <div>
              {nav.pages.map(({ slug, title }) => (
                <a key={title} href={slug}>{title}</a>
              ))}

              {nav.blogs.map(({ slug, title }) => (
                <a key={title} href={slug}>{title}</a>
              ))}

              {nav.categories.map(({ slug, title }) => (
                <a key={title} href={slug}>{title}</a>
              ))}              
            </div>
          </div>
        )
      }}
    />
  );
}