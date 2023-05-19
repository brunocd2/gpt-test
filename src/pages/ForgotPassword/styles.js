import styled from 'styled-components'

export const ForgotPasswordContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  /* height: 100vh; */

  > img {
    width: 200px;
    margin-bottom: 2rem;

    @media (max-width: 400px) {
      width: 15rem;
    }
  }

  h2 {
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 1.5rem;
    color: var(--black2);
  }

  p {
    font-family: Inter, 'sans-serif';
    font-size: 22px;
    font-weight: 500;
    max-width: 416px;
    text-align: center;
    color: var(--gray3);
    margin-bottom: 2rem;

    @media (max-width: 400px) {
      font-size: 13px;
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  
    > button {
      background: var(--branding);
      width: 315px;
      height: 40px;
      color: var(--white);
      font-weight: 500;
      font-size: 20px;
      margin: 2rem 0;
      border-radius: 4px;
    }

    a {
      font-size: 14px;
      color: var(--gray3);
      font-family: Poppins, sans-serif;
      text-decoration: none;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;

      span {
        margin-right: 0.8rem;
        font-size: 1.5rem;
      }
    }
  }
`