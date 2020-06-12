import React from 'react';
import styled from 'styled-components';

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;

  .tag {
    background: var(--black);
    color: var(--white);
    padding: 0.5rem 0.25rem;
    transform: skew(-15deg);
    margin-right: 0.5rem;
    span {
      transform: skew(15deg);
    }
  }
`;

const Tags = ({ tags }) => (
  <StyledTags>
    {tags.map((tag) => (
      <div key={tag.id} className="tag">
        <span>{tag.title}</span>
      </div>
    ))}
  </StyledTags>
);

export default Tags;
