import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import 'normalize.css';
import GlobalStyles from './GlobalStyles';
import Meta from './Meta';
import Header from './Header';
import Content2 from './Content2';
import Footer from './Footer';

export default ({ children, meta, title }) => (
  <StaticQuery
    query={graphql`
        query HomeLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            googleTrackingId
            socialMediaCard {
              image
            }
          },
          file(relativePath: { eq: "axiom-logo.png" }) {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
    render={(data) => {
      const { siteTitle, socialMediaCard, googleTrackingId } = data.settingsYaml || {};

      return (
        <>
          <Helmet
            defaultTitle={siteTitle}
            titleTemplate={`%s | ${siteTitle}`}
          >
            {title}
          </Helmet>
          <Meta
            googleTrackingId={googleTrackingId}
            absoluteImageUrl={
                socialMediaCard
                && socialMediaCard.image
                && socialMediaCard.image
              }
            {...meta}
            {...data.settingsYaml}
          />
          <GlobalStyles />
          <Header logo={data.file.childImageSharp.fixed} />
          {children}
          <Footer />
        </>
      );
    }}
  />
);
