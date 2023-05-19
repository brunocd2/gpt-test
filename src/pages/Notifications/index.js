import { useContext, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import { NoNotifications, NoSelectedNotification, Notification, NotificationsWrapper, SelectedNotification } from './styles';

import {GlobalContext} from '../../contexts/global';
import DescriptionIcon from '../../assets/icons/notifications/description.png';
import PaymentsIcon from '../../assets/icons/notifications/payments.png';
import DownloadIcon from '../../assets/icons/download.png';
import WarningIcon from '../../assets/icons/notifications/warning.png';
import NotificationsImage from '../../assets/notifications.svg';
import NoNotificationsImage from '../../assets/noNotifications.svg';
import Button from '../../components/Button';

export default function Notifications() {
  const { notifications } = useContext(GlobalContext);
  const [selectedNotification, setSelectedNotification] = useState(null);

  function handleClickNotification(notification) {
    notification === selectedNotification
      ? setSelectedNotification(null)
      : setSelectedNotification(notification);
  }

  return (
    <PageContainer title="Central de Notificações" customWrapper>
      {notifications.length > 0
        ? <NotificationsWrapper>
            <div>
              {notifications.map(notification => 
                <Notification 
                  type={notification.type}
                  selected={selectedNotification?.title === notification.title}
                  onClick={() => handleClickNotification(notification)}
                >
                  <div>
                    {notification.title}
                    <small>{notification.date}</small>
                  </div>
                  <div className='notificationIcon'>
                    <img 
                      src={
                        notification.type === 'description' ? DescriptionIcon
                        : notification.type === 'payments' ? PaymentsIcon
                        : notification.type === 'warning' && WarningIcon
                      } 
                      alt="" />
                  </div>
                </Notification>  
              )}
            </div>
            {!selectedNotification
              ? <NoSelectedNotification>
                  <h1>Sua área de notificações</h1>
                  <p>Clique em uma notificação para <br/> abrir e visualiza-la completa.</p>  
                  <img src={NotificationsImage} alt=""/>   
                </NoSelectedNotification>
              : <SelectedNotification>
                  <h1>{selectedNotification.title}</h1>
                  <p>{selectedNotification.description}</p>
                  {selectedNotification.file &&
                    <>
                      <Button text="Visualizar Relatório" color="branding" />
                      <Button color="branding">
                        Download     
                        <img src={DownloadIcon} alt="" />
                      </Button>
                    </>
                  }
                </SelectedNotification>
            }
          </NotificationsWrapper>
        : <NoNotifications>
            <h1>Ops... Você não possui <br /> notificações no momento!</h1>
            <img src={NoNotificationsImage} alt="" />
          </NoNotifications>
      }
    </PageContainer>
  )
}