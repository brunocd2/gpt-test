import styled from "styled-components";

export const TableWrapper = styled.div`
  display: block;
  overflow-y: auto;
  overflow-x: auto;

  table { 
    display: flex;
    border-spacing: 0;
    table-layout: fixed;
    flex-direction: column;
  }

  thead {
    top: 0;
    position: sticky;
  }

  border-radius: 4px;

  tr {
    display: flex;
  }

  .bigger {
    min-width: 440px;
  }
  th {
    color: var(--white);
    background-color: var(--branding);
    font-size: 10px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    min-width: 162px;
    border-left: 1px solid #C9C9C9;
    
    &:first-child {
      border-top-left-radius: 4px;
    }

    &:last-child{
      border-right: 1px solid #C9C9C9;
    }
  }
  td {
    min-width: 162px;
    border-bottom: 1px solid #C9C9C9;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 10px;
    font-family: 'Poppins', sans-serif;
    padding: 2px;
    border-left: 1px solid #C9C9C9;

    @media (max-width: 600px) {
      font-size: 12px;
    }

    &:last-child{
      border-right: 1px solid #C9C9C9;
    }
  }
`