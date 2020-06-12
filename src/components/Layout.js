import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import 'normalize.css';
import GlobalStyles from './GlobalStyles';
import Meta from './Meta';
import Header from './Header';
import Footer from './Footer';
import Hexagons from './Hexagons';
import Section from './Section';

export default ({
  children, meta, title, subtitle, featured,
}) => (
  <StaticQuery
    query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            googleTrackingId
            socialMediaCard {
              image
            }
          }
          file(relativePath: { eq: "axiom-logo.png" }) {
            childImageSharp {
              fixed(width: 150) {
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
          <Hexagons />
          <Section>
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
            {featured && featured.image && (
              <>
                <Img fluid={featured.image.childImageSharp.fluid} />
                {featured.caption && <span>{featured.caption}</span>}
              </>
            )}
          </Section>
          {children}
          <Footer />
        </>
      );
    }}
  />
);
