import styled from "styled-components";

export const CreateUserWrapper = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;
  margin-left: 40px;

  h1 {
    font-weight: 700;
    color: var(--black2);
    font-size: 28px;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  p {
    font-family: Poppins, sans-serif;
    color: var(--gray3);
    font-size: 16px;
  }

  form {
    width: 516px;
    margin-top: 48px;

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
      width: 55%;
      margin-top: 40px;
    }
  }
`
