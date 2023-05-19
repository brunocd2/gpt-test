import styled from "styled-components";

export const InputWithIconWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 20px;
    margin-bottom: 8px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
  }
  
  label {
    border: 1px solid var(--gray4);
    background-color: #FFFFFF;
    border-radius: 4px;
    cursor: text;
    display: flex;
    padding: 0 16px;
    position: relative;
    width: 280px;
    img {
      margin: auto 0px;

      &.right {
        cursor: pointer;
      }
    }
    
    input {
      border: none;
      height: 40px;
      border-radius: 4px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 14px;
      margin-left: 15px;
      width: 100%;

      &:focus {
        outline: none;
      }

    }
  }
`