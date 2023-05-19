import styled from "styled-components";

export const NotificationsWrapper = styled.section`
  display: flex;
  height: 100vh;

  > div {
    padding: 2rem;
    padding-bottom: 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    border-right: 2px solid var(--gray1);
    max-height: 80vh;
    overflow-x: auto;
  }
`

export const Notification = styled.span`
  margin-bottom: 20px;
  background: ${props => props.selected ? 'var(--white)' : 'var(--box-bg)'};
  border-left: 8px solid var(--${props => 
    props.type === 'description' ? 'branding' 
    : props.type === 'payments' ? 'green'
    : props.type === 'warning' && 'yellow'});
  padding: 8px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  font-size: 13px;
  font-family: 'Poppins';
  font-weight: 600;
  color: var(--black);
  display: flex;
  align-items: center;
  height: 96px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }

  div {
    display: flex;
    flex-direction: column;
    margin-right: auto;
  }

  div.notificationIcon {
    max-width: 64px;
    max-height: 64px;
    min-width: 64px;
    min-height: 64px;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: var(--${props => 
    props.type === 'description' ? 'branding' 
    : props.type === 'payments' ? 'green'
    : props.type === 'warning' && 'yellow'});
    margin-left: 2rem;
    margin-right: 0.5rem;
  }

  small {
    font-size: 12px;
    margin-top: 4px;
    color: var(--gray3);
  }
`

export const NoSelectedNotification = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.75rem;
    margin-top: 2rem;
    color: var(--black2);
  }

  p {
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: var(--gray3);
    text-align: center;
  }

  img {
    width: 25rem;
  }
`

export const SelectedNotification = styled(NoSelectedNotification)`
  justify-content: start;
  
  h1 {
    color: var(--black);
    text-align: center;
    font-size: 13px;
    max-width: 300px;
  }

  p {
    color: var(--black);
    margin-top: 4rem;
    text-align: left;
    max-width: 400px;
    font-weight: 400;
  }

  button {
    padding: 0 1.5rem;
    margin-right: 0;
    font-size: 16px;
    width: 13rem;
    margin-top: 2rem;
    margin-bottom: 1rem;

    &:last-child {
      margin-top: 0;
    }
    img {
      width: 16px;
      margin-left: 1rem;
    }
  }
`

export const NoNotifications = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    color: var(--gray3)
  }

  img {
    width: 400px
  }
`