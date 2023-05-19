import styled from "styled-components";

export const PageWrapper = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--white);
  max-width: calc(100% - 224px - 2.5rem);
  max-height: 95vh;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  @media (max-width: 800px) {
    max-width: 100%;
    max-height: 100vh;
  }

  header {
    background-color: #f7b2d1;
    padding: 15px 24px;
    border-radius: 12px 12px 0px 0px;
    
    h1 {
      font-weight: 500;
      font-size: 20px;
      color: #ffffff;
      text-transform: capitalize;
    }
  }

  main {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
  }
`