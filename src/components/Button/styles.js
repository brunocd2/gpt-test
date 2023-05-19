import styled from "styled-components";

export const ButtonWrapper = styled.button`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: var(--${props => props.color});
  color: var(--white);
  border-radius: 4px;
`