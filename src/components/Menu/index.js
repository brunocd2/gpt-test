import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuWrapper, MobileMenuIcon } from "./styles";
import { GlobalContext } from "../../contexts/global";

import Logo from '../../assets/logo.png';
import DashboardIcon from '../../assets/icons/menu/chart.png';
import DashboardActiveIcon from '../../assets/icons/menu/chart_active.png';
import ProductsIcon from '../../assets/icons/menu/inventory.png';
import ArrowUpIcon from '../../assets/icons/menu/arrow_up.png';
import ArrowDownIcon from '../../assets/icons/menu/arrow_down.png';
import MailIcon from '../../assets/icons/menu/mail.png';
import NotificationsIcon from '../../assets/icons/menu/notifications.png';
import NotificationsActiveIcon from '../../assets/icons/menu/notifications_active.png';
import SettingsIcon from '../../assets/icons/menu/settings.png';
import LogoutIcon from '../../assets/icons/menu/logout.png';
import HamburguerIcon from '../../assets/icons/menu/hamburguer.png';
import { getAllProducts, getProductsByCategory, getProductsByPartner } from "../../services/api";
 

export default function Menu({ hideRoutes }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeInsideSubMenu, setActiveInsideSubMenu] = useState(null);
  const [showFullScreenMenu, setShowFullScreenMenu] = useState(false);
  const { notifications, session,categories, partners, setProducts, setFilteredProducts, products } = useContext(GlobalContext);


  function handleClick() {
    window.location.assign("whatsapp://qr/4QTZW34UNDNWK1?autoload=1&amp;app_absent=0" ,'_blank');

    
  }


  function handleClickSubMenu(subMenu) {
    if(subMenu!="configurations"){

    subMenu === activeSubMenu
      ? setActiveSubMenu(null)
      : setActiveSubMenu(subMenu);
    }else if( subMenu!="configurations" && session.name=="Laissa"){
      subMenu === activeSubMenu
      ? setActiveSubMenu(null)
      : setActiveSubMenu(subMenu);
    }
  }

  function handleClickInsideSubMenu(insideSubMenu) {
    if(insideSubMenu!="configurations"){
    insideSubMenu === activeInsideSubMenu
      ? setActiveInsideSubMenu(null)
      : setActiveInsideSubMenu(insideSubMenu)
    }else if( insideSubMenu!="configurations" && session.name=="Laissa"){
      insideSubMenu === activeInsideSubMenu
      ? setActiveSubMenu(null)
      : setActiveSubMenu(insideSubMenu);
    }
  }

  function handleNavigate(route, filterType, filter) {
    if(session.name=='Laissa' ){
    if (filterType) {
      setFilteredProducts(() => products.filter(el => el[filterType] === filter));

      if (filterType === 'categoria') {
        getProductsByCategory(filter).then(products => setFilteredProducts(products));
      }
      if (filterType === 'parceiro') {
        getProductsByPartner(filter).then(products => setFilteredProducts(products));
      }

      navigate(route + `/${filterType}/${filter}`);
    } else {
      setFilteredProducts([]);
      getAllProducts().then(products => setProducts(products));
      navigate(route);
    }
  }
    setShowFullScreenMenu(false);
  }

  if (!hideRoutes.includes(location.pathname)) {
    return (
      <>
        <MobileMenuIcon onClick={() => setShowFullScreenMenu(true)}>
          <img src={HamburguerIcon} alt="-" />
        </MobileMenuIcon>
        <MenuWrapper showFullScreen={showFullScreenMenu}>
          <button className="close" onClick={() => setShowFullScreenMenu(false)}>
            X
          </button>
          <img src={Logo} alt="cd" />
          <span className="divider" />
          <nav>
            <div>
              <h2>Operações</h2>
              <span
                onClick={() => handleNavigate('/assistente-virtual')}
                className={location.pathname === '/assistente-virtual' ? 'active' : ''}
              >
                <img src={location.pathname === '/assistente-virtual' ? DashboardActiveIcon : DashboardIcon} alt="" />
                Laissa Virtual
              </span>
              
              <span onClick={() => handleClickSubMenu('products')}>
                <img src={ProductsIcon} alt="" />
                Atendimentos
                <img
                  className="rightIcon" alt=""
                  src={activeSubMenu === 'products' ? ArrowUpIcon : ArrowDownIcon}
                />
              </span>
              {activeSubMenu === 'products' &&
                <div className="subMenuContent">
                  <span
                    onClick={() => handleClick()}
                    className={location.pathname === '/produtos-cadastrados' ? 'active' : ''}
                  >
                    Agendar novo Procedimento
                  </span>
                  
                </div>
              }
            </div>
            <div className="mid">
              <h2>Mensageria</h2>
              <span
                onClick={() => handleNavigate('/notificacoes')}
                className={location.pathname === '/notificacoes' ? 'active' : 'notification'}
              >
                <img
                  src={location.pathname === '/notificacoes' ? NotificationsActiveIcon : NotificationsIcon}
                  alt=""
                />
                Notificações
                {notifications.length > 0 &&
                  <span className="badge">
                    {notifications.length}
                  </span>
                }
              </span>
              <span>
                <img src={MailIcon} alt="-" />
                Mensagens
              </span>
            </div>
            <div>
              <h2>Configurações</h2>

              <span onClick={() => handleClickSubMenu('configurations')}>
                <img src={SettingsIcon} alt="" />

                Configurações

                <img
                  className="rightIcon" alt=""
                  src={activeSubMenu === 'products' ? ArrowUpIcon : ArrowDownIcon}
                />
              </span>

              {activeSubMenu === 'configurations' &&
                <div className="subMenuContent">
                  <span onClick={() => handleNavigate('/usuarios')}
                    className={location.pathname === '/usuarios' ? 'active' : ''}
                  >
                    Cadastrar Usuário
                  </span>

                  <span
                    onClick={() => handleNavigate('/produtos-cadastrados')}
                  // className={location.pathname === '/produtos-cadastrados' ? 'active' : ''}
                  >
                    Configurações
                  </span>
                </div>
              }

              <span onClick={() => handleNavigate('/')}>
                <img src={LogoutIcon} alt="" />
                Sair da aplicação
              </span>
            </div>
          </nav>
        </MenuWrapper>
      </>
    )
  }
}