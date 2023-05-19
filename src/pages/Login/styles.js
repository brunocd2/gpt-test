import styled from "styled-components";

export const LoginLeftWrapper = styled.div`
  background-color: var(--branding);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36.25rem;

  img {
    margin: 0 6.25rem;
  }

  h2 {
    margin-top: 104px;
    text-align: center;
    font-size: 22px;
  }

  @media (max-width: 1000px) {
    width: 30rem;
  }

  @media (max-width: 850px) {
    width: 20rem;

    img {
      width: 15rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 700px) {
    display: none;
  }
`

export const LoginRightWrapper = styled.main`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--black2);
  width: 100%;
  
  > img {
    width: 15rem;
    margin-bottom: 2.5rem;

    @media (min-width: 700px) {
      display: none;
    }
  }

  h2 {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 4.5rem;

    @media (max-width: 700px) {
      margin-bottom: 2.5rem;
    }
  }

  h3 {
    margin-bottom: 2rem;
  }

  p {
    font-size: 24px;
    font-family: Inter, sans-serif;
    color: var(--gray3);
    margin-bottom: 2.5rem;
    margin-top: -2.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    margin-bottom: 2rem;
    
    > div:last-of-type {
    margin-top: 1.5rem;
  }

    a {
      margin-top: 10px;
      text-align: end;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      text-decoration: underline;
      color: var(--branding);
    }

    button {
      margin-top: 2rem;
    }
  }
`