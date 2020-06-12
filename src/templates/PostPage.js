import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Content from '../components/Content';
import Testimonial from '../components/Testimonial';

const StyledTestimonialList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const StyledImages = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

const StyledImage = styled.div`
  text-align: center;
`;

const PostPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta}
    title={page.frontmatter.title}
    subtitle={page.frontmatter.subtitle}
    featured={page.frontmatter.featured}
  >
    <Section>
      <Content source={page.html} />
    </Section>
    {page.fields && page.fields.testimonials && (
      <Section>
        <h3>Testimonials</h3>
        <StyledTestimonialList>
          {page.fields.testimonials.map((testimonial) => (
            <Testimonial testimonial={testimonial} />
          ))}
        </StyledTestimonialList>
      </Section>
    )}
    <Section>
      <StyledImages>
        <Slider
          settings={{
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
          }}
        >
          {page.frontmatter.images
            && page.frontmatter.images.map((image) => (
              <StyledImage>
                <Img fluid={image.image.childImageSharp.fluid} />
                <span>{image.caption}</span>
              </StyledImage>
            ))}
        </Slider>
      </StyledImages>
    </Section>
  </Layout>
);

export default PostPage;

export const pageQuery = graphql`
  query PostPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      fields {
        testimonials {
          frontmatter {
            name
            content
            affiliation
            headshot {
              childImageSharp {
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
      frontmatter {
        template
        title
        date
        featured {
          image {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
        images {
          caption
          image {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
