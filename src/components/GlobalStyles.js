import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --white: #FFF;
    --black: #000;
    --lightgrey: #E8E8E8;
    --grey: #777;
    --maxWidth: 800px;
  }

  @import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400');

  html {font-size: 100%;} /*16px*/

  body {
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    line-height: 1.65;
    color: var(--grey);
  }

  h1, h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
    font-weight: 400;
    line-height: 1.15;
  }

  h1 {font-size: 2.488em;}

  h2 {font-size: 2.074em;}

  h3 {font-size: 1.728em;}

  h4 {font-size: 1.44em;}

  h5 {font-size: 1.2em;}

  small, .text_small {font-size: 0.833em;}

  p {
    margin: 0;
    padding: 0;
  }
`;
export default GlobalStyles;
