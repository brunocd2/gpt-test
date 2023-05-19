import styled from "styled-components";

export const MenuWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  width: 14rem;
  background: var(--branding);
  height: 100vh;
  color: var(--white);
  font-family: 'Poppins', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  
  @media (max-width: 800px) {
    display: ${props => props.showFullScreen ? 'flex' : 'none'};
    position: absolute;
    z-index: 10;
    width: 100vw;
  }

  button.close {
    display: none;

    @media (max-width: 800px) {
      display: flex;
      position: absolute;
      right: 1rem;
      color: var(--white);
      font-size: 1.8rem;
    }
  }

  > img {
    width: 140px;
    height: 98px;

    @media (max-width: 800px) {
      width: 7rem;
    }
  }

  span.divider {
    min-height: 1px;
    width: 192px;
    background: var(--gray1);
    margin: 1rem;

    @media (max-width: 800px) {
      background: none;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    > div {
      &:not(:last-of-type) {
        margin-bottom: 2rem;
      }

      &.mid {
        margin-top: auto 0;
      }

      h2 {
        margin-left: 1rem;
        font-weight: 600;
        font-size: 13px;
      }

      span {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        padding: 2px 0;
        padding-left: 20px;
        flex: 1;
        font-size:12px;
        cursor: pointer;
        border-radius: 0px 4px 4px 0px;
        position: relative;
        margin-right: 0.5rem;

        &:hover:not(.active) {
          filter: brightness(0.8);
        }

        &.notification {
          margin-right: 3rem;
        }

        &.active {
          background-color: var(--white);
          color: var(--branding);
          margin-right: 3rem;
        }

        img {
          margin-right: 10px;

          &.rightIcon {
            margin-left: auto;
          }
        }

        span.badge {
          padding-left: 0;
          width: 20px;
          height: 20px;
          font-weight: 600;
          border-radius: 100%;
          background-color: var(--white);
          color: var(--branding);
          position: absolute;
          right: -2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
      }
      div.subMenuContent {
        span {
          padding: 2px 0;
          padding-left: 50px;
          margin: 10px 0;
          margin-right: 2rem;
          width: auto;
          font-size:12px;
          
          &.fullWidth {
            width: 100%;
          }
        }

      }
      div.insideSubmenu {
        span {
          padding-left: 70px;
        }
      }
    }
  }
`

export const MobileMenuIcon = styled.button`
  position: fixed;
  width: 3rem;
  height: 3rem;
  display: none;
  background-color: var(--branding);
  border: 2px solid var(--white);
  border-radius: 4px;
  right: 1rem;
  top: 0.5rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    display: flex;
  }

  img {
    width: 2rem;
  }
`