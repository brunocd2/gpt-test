import styled from "styled-components";
import Button from '../../components/Button';

export const FilterArea = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 400px) {
    div {
      flex-direction: column;

      button {
        margin-right: 0;
      }
    }
  }

  div {
    display: flex;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: var(--gray3);
    
    div {
      margin-left: 1rem;
      
      label {
        background-color: #EAECF4;
        border-color: var(--gray1);
      
        input {
          background-color: #EAECF4;
          margin-left: 0; 
        }
      }
    }
  }
`

export const FilterButton = styled(Button)`
  border-radius: 4px;
  margin-right: 12px;
  padding-right: 15px;
  font-size: 1rem;

  img {
    margin: 0 12px;
  }

  @media (max-width: 800px) {
    margin-top: 0.8rem;
  }
`

export const ExcelButton = styled(FilterButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-family: Poppins, sans-serif;
  text-decoration: none;
  background: var(--branding);
  border-radius: 4px;
  margin-right: 12px;
  padding-right: 15px;
  font-size: 1rem;

  img {
    margin: 0 12px;
  }

  @media (max-width: 800px) {
    margin-top: 0.8rem;
  }
`

export const ShowPerPageArea = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  @media (max-width: 800px) {
    margin: 1rem 0;
  }
  
  label {
    font-size: 13px;
    font-weight: 400;
    color: var(--gray3);
    
    @media (max-width: 800px) {
      font-size: 1rem;
    }
  }

  input {
    width: 4.5rem;
    height: 40px;
    background-color: #EAECF4;
    border: 1px solid var(--gray1);
    padding: 8px;
    font-size: 13px;
    margin: 0 1rem;
    border-radius: 4px;
    font-weight: 600;
    color: var(--gray3);

    @media (max-width: 800px) {
      font-size: 1rem;
      height: auto;
    }
  }
`

export const PaginationArea = styled.footer`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;

    ul {
      margin-top: 0.5rem;
    }
  } 

  div > span {
    font-weight: 600;
  }

  ul {
    display: flex;
    list-style: none;

    li {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--branding);
      border: 1px solid var(--gray1);
      cursor: pointer;

      &.previous, &.next{
        width: auto;
        padding: 0 10px;
      }

      &.previous {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &.next {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &.active {
        color: var(--white);
        background-color: var(--branding);
        border: 0;
      }
    }
  }
`

export const ModalContent = styled.div`
  width: 580px;

  @media (max-width: 580px) {
    width: 100vw
  }

  header {
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    
    h2 {
      font-size: 16px;
      color: var(--branding);
    }
  }

  > label {
    font-size: 10px;
    color: var(--gray3);
    margin: 1rem;
  }

  > div {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;

    label {
      display: flex;
      font-weight: 400;
      font-size: 10px;
      min-width: 50%;
      margin-bottom: 10px;

      @media (max-width: 580px) {
        width: 100%;
      }
    }

    input {
      margin-right: 12px;
    }

    input[type="text"] {
      border: 1px solid var(--gray1);
      background: #EAECF4;
      border-radius: 4px;
      font-size: 12px;
      margin-left: auto;
      margin-right: 2rem;
      padding: 4px 8px;
      width: 115px;
      height: 24px;

      @media (max-width: 580px) {
        margin-right: 0;
      }
    }
  }
`

export const ModalButton = styled(Button)`
  padding: 0 1rem;
  height: 32px;
  margin-left: 12px;

  &:first-child {
    margin-left: auto;
  }
`