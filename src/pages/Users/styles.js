import styled from "styled-components";

export const CreateUserWrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  margin: 0 1.5rem;
  flex: 1;
  padding-bottom: 1.5rem;

  @media(max-width: 600px) {
    margin: 0 1rem;
  }

  h1 {
    font-weight: 700;
    color: var(--black2);
    font-size: 28px;
    margin-top: 16px;
    margin-bottom: 8px;

    @media(max-width: 600px) {
      font-size: 20px;
    }
  }
  
  p {
    font-family: Poppins, sans-serif;
    color: var(--gray3);
    font-size: 16px;
  
  }

  div.headerRow {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-between;

    button {
      width: 196px;
      font-size: 1rem;

      @media(max-width: 400px) {
        width: 100%;
      }
    }

    span {
      display: flex;
      align-items: center;

      @media(max-width: 600px) {
        width: 100%;
        margin-top: 1rem;
      }

      @media(max-width: 400px) {
        flex-wrap: wrap;
      }

      > label {
        display: flex;
        min-width: 7rem;
        font-size: 14px;
        margin-right: 0.5rem;
      }

      > div {
        width: 15rem;

        @media(max-width: 600px) {
          width: 100%;
        }
      }
    }
  }

  table {
    margin-top: 2rem;
    margin-bottom: auto;
    display: flex;
    font-size: 1rem;
    width: 100%;
    max-width: 90vw;
    font-weight: 500;
    font-family: Poppins, sans-serif;
    color: var(--gray3);
    overflow-x: auto;
    border-collapse: collapse;

    tbody {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    tbody > tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-left: 5px solid;
      border-left-color: #0000;
      padding-left: 0.5rem;

      &:not(:last-child) {
        border-bottom: 1px solid var(--gray1); 
      }

      &.active {
        border-left-color: var(--branding);
      }

      td {
        &:first-child {
          flex: 0;
          min-width: 0;
          margin-right: 2rem;
        }

        display: flex;
        flex: 1;
        align-items: center;

        @media(max-width: 800px) {
          width: 11rem;
        }

        &.role {
          flex: 0;
          min-width: 10rem;
        }

        &.actions {
          flex: 0;

          button {
            margin-right: 2rem;
          }

          button:last-child {
            margin-right: 0.5rem;
          }
        }

        span {
          height: 12px;
          width: 12px;
          border-radius: 100%;
          margin-right: 0.5rem;
          
          &.adm {
            background: var(--branding);
          }

          &.manager {
            background: var(--green);
          }
        }
      }
    }
  }

  form {
    margin-top: 48px;
    width: 516px;

    > span {
      display: flex;
      margin-bottom: 15px;
    
      > div:not(:last-child) {
        margin-right: 36px;
      }
    }
    
    h2 {
      color: var(--black2);
      font-size: 20px;
      font-weight: 500;
      margin: 20px 0;
    }

    div.permissions {
      display: flex;
      flex-wrap: wrap;

      label {
        width: 50%;
        color: #666;
        font-family: Poppins, sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;

        input {
          margin-right: 12px;
        }
      }
    }

    > button {
      margin-top: 40px;
      width: 328px;
    }
  }
`

export const CreateUserModalContent = styled.section`
  width: 562px;
  border-radius: 8px;
  background-color: #fff;

  @media(max-width: 600px) {
    width: 96%;
    margin-left: auto;
    margin-right: auto;
  }

  header {
    border-bottom: 1px solid #ccc;
    color: var(--branding);
    padding: 8px 20px;
  }

  form {
    padding: 8px 20px;

    h3 {
      font-size: 14px;
      color: var(--gray3);
      font-weight: 600;
      margin-bottom: 1rem;
    }

    p {
      font-size: 14px; 
      color: var(--gray3);
      font-family: Poppins, sans-serif;

      span {
        font-weight: 600;
        color: var(--branding);
      }
    }

    > span {
      display: flex;
      margin-bottom: 15px;

      @media(max-width: 510px) {
        flex-direction: column;
      }
    
      @media(min-width: 511px) {
        > div:not(:last-child) {
          margin-right: 36px;
        }
      }
    }
    
    h2 {
      color: var(--black2);
      font-size: 14px;
      font-weight: 500;
      margin: 20px 0;
    }

    div.permissions {
      display: flex;
      flex-wrap: wrap;

      label {
        width: 50%;
        color: #666;
        font-family: Poppins, sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;

        input {
          margin-right: 12px;
        }
      }
    }

    footer {
      display: flex;
      justify-content: end;
      margin: 1rem 0;

      &.deleteFooter {
        margin-top: 2rem;
      }
    
      button:first-child {
        width: 112px;
        margin-right: 1rem;
      }

      button:last-child {
        width: 160px;
      }
    } 
  }
`