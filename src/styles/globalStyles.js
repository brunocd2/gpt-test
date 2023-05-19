import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {    
    --branding: #f7b2d1;
    --branding-analog: #4BD4FA;
    --red: #C70037;
    --green: #42BA96;
    --dark-green: #1E8465;
    --yellow: #F6C23E;
    --background: #F8F9FC;
    --white: #FFFFFF;
    --box-bg: rgba(234, 236, 244, 0.9);
    --gray1: #D9D9D9;
    --gray2: #ACACAC;
    --gray3: #666666;
    --gray4: #807D9B;
    --black1: #121214;
    --black2: #33343D;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    whi
    /* font-family: 'Inter', sans-serif;
    font-family: 'Poppins', sans-serif; */
  }
  .container {
    display: flex;
  }

  h1, h2, h3, h4, h5, label {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }

  body {
    background-color: var(--background);
  }

  select {
    font-size: 10px;
    font-family: 'Inter';
    color: var(--black2);
    background-color: var(--white);
    border: 1px solid var(--gray4);
    border-radius: 4px;
    height: 32px;
    padding: 4px;
  }
  
  button {
    border: 0;
    background: none;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      filter: brightness(1.2);
    }
  }

  span.error {
    font-family: Poppins, sans-serif;
    color: var(--red);
    text-align: center;
    margin-top: 0.25rem;
  }
`