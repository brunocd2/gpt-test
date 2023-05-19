import styled from "styled-components";

export const DashboardWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex: 1;
  max-height: 100vh;
  overflow-x: auto;
`

export const PaginationArea = styled.footer`
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
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

export const DashboardHeader = styled.header`
  width: 100%;
  display: flex;
  margin-top: 10%;
  h1 {
    font-size: 24px;
    color: var(--black);
  }
  small {
    font-family: 'Poppins', sans-serif;
    font-size: 10px;
    font-weight: 600;
    color: var(--gray3);
  }
  img {
    width: 56px;
    border-radius: 100%;
  }
`

export const DashboardFilterArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  div {
    display: flex;
    align-items: center;
    > div {
      margin-left: 10px;
    }
    > label {
      font-size: 10px;
      margin-right: 12px;
      color: var(--black2);
      margin-right: 0;
    }
    > label > input{
      height: 32px;
      width: 150px;
      margin-left: 0;
      background-color: var(--bg-gray);
    }
  }
  span {
    margin: 0.5rem;
    background-color: var(--gray4);
    height: 1px;
    width: 1rem
  }
`

export const CardsArea = styled.section`
  display: flex;
  
  div.filterProducts {
    margin-bottom: 1.5rem;
    div.searchResult {
      max-height: 150px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0.5rem;
      background-color: #FFFFFF;
      border: 1px solid #E7E8F2;
      margin-bottom: 0.5rem;
      margin-top: 0.2rem;
      border-radius: 6px;

      span {
        cursor: pointer;
        padding: 0.2rem;
        &:hover {
          background-color: #E7E8F2;
        }
      }
    }
  }

  div.cards {
    width: 100%;
    div.cardRow {
      display: flex;
      flex: 1;
    }
    div.card {
      padding: 1rem;
      border: 1px solid #E7E8F2;
      background-color: #FFFFFF;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      font-family: 'Poppins', sans-serif;
      margin-bottom: 20px;
      flex: 1;
      h3 {
        font-size: 14px;
        margin-bottom: 1rem;
      }
      span {
        display: flex;
        align-items: center;
        font-size: 22px;
        color: var(--branding);
        font-weight: bold;
        margin-bottom: 4px;
        img {
          margin-left: 4px;
        }
      }
      span.profit, span.loss, span.zero {
        margin-left: 12px;
        font-size: 16px;
        font-weight: 400;
      }
      span.profit {
        color: var(--dark-green);
      }
      span.loss {
        color: var(--red);
      }
      span.zero {
        color: #A7A9C0;
      }
      small {
        font-size: 13px;
        color: var(--gray4);
      }
    }
  }

  
  select {
    margin-bottom: 1rem;
  }
`

export const DefaultDashboardWrapper = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #FFFFFF;
  border: 1px solid #E7E8F2;
  border-radius: 6px;
  margin-bottom: 20px;
  flex: ${props => props.isBarChart ? 1 : '0'};
  
  select.chart {
    margin: 1rem 0;
  }
  header {
    display: flex;
    border-bottom: 1px solid #E7E8F2;
    padding: 14px;
    h3 {
      font-weight: 500;
      font-size: 10px;
      margin-right: auto;
      color: var(--branding);
    }
    > span {
      color: #A7A9C0;
      font-weight: bold;
      cursor: pointer;
    }
  }
  div.content {
    padding: 0 40px;
    padding-bottom:50px; 
    padding-top: ${props => props.isBarChart ? '2rem' : '0'};
    h3 {
      font-family: 'Inter';
      font-weight: 500;
      font-size: 10px;
      text-align: center;
      margin: 1rem 0;
    }
    select {
      margin-bottom: 0.5rem;
      width:80%
    }
    span {
      margin: 1rem;
    }
    li {
      font-family: "Inter";
      font-size: 10px;
      font-weight: 500;
    }
  }
  legend.pieChartLegend {
    display: flex;
    div > span {
      margin: 0;
      margin-bottom: 4px;
    }
  }
`

export const PieChartLegendValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  flex: 1;
  font-family: 'Inter', sans-serif;
  z-index: 2;
  
  &:not(:last-child) {
    border-right: 1px solid #E7E8F2;
  }
  span:first-child {
    color: ${props => props.color};
    font-size: 13px;
    font-weight: 500;
  }
  span:last-child {
    font-size: 13px;
    color: var(--gray4);
    border-right: 0;
  }
`

export const ChartsRow = styled.section`
  display: flex;
`

export const MetricProducts = styled.section`
  padding-top: 1.5rem;
  h2 {
    display: inline;
    color: var(--branding);
    font-size: 20px;
    border-bottom: 1px solid var(--branding);
  }
  table {
    width: 100%;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin: 1rem 0;
    
    th {
      color: var(--gray3);
      font-size: 10px;
      text-align: start;
    
      &.center {
        text-align: center;
      }
    }
    td {
      font-size: 13px;
      color: var(--black2);
      padding-top: 0.8rem;    
      
      &.center {
        text-align: center;
      }
    }
    .divider {
      display: flex;
      width: 100px;
      height: 1px;
      background-color: var(--gray4);
      padding-top: 0;       
      margin-top: 25px;
    }
  }
`