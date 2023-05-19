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
  const { notifications, categories, partners, setProducts, setFilteredProducts, products } = useContext(GlobalContext);

  function handleClickSubMenu(subMenu) {
    subMenu === activeSubMenu
      ? setActiveSubMenu(null)
      : setActiveSubMenu(subMenu);
  }

  function handleClickInsideSubMenu(insideSubMenu) {
    insideSubMenu === activeInsideSubMenu
      ? setActiveInsideSubMenu(null)
      : setActiveInsideSubMenu(insideSubMenu)
  }

  function handleClick() {
    window.location.assign("whatsapp://qr/4QTZW34UNDNWK1?autoload=1&amp;app_absent=0");

    
  }

  function handleClickMaps() {
    window.location.assign("  https://www.google.com/maps/place/Cevally+Cabeleireiros/@-27.4287905,-48.4590829,17z/data=!3m1!4b1!4m6!3m5!1s0x95274378a09ea60b:0x92da23838394b3a2!8m2!3d-27.4287953!4d-48.456508!16s%2Fg%2F11fpl1lppy" ,'_blank');

    
  }


  function handleNavigate(route, filterType, filter) {
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
              <h2>Meus Procedimentos</h2>
              <span
                onClick={() => handleNavigate('/assistente-virtual')}
                className={location.pathname === '/assistente-virtual' ? 'active' : ''}
              >
                <img src={location.pathname === '/assistente-virtual' ? DashboardActiveIcon : DashboardIcon} alt="" />
                Assistente Virtual
              </span>
              <span onClick={() => handleClickSubMenu('products')}>
                <img src={ProductsIcon} alt="" />
                Procedimentos
                <img
                  className="rightIcon" alt=""
                  src={activeSubMenu === 'products' ? ArrowUpIcon : ArrowDownIcon}
                />
              </span>
              {activeSubMenu === 'products' &&
                <div className="subMenuContent">
                  <span
                    onClick={() => handleClick()}
                  >
                    Agendar novo Procedimento
                  </span>
                  
                  
                  <span
                    onClick={() => handleNavigate('/')}
                  >
                    Agendados
                  </span>

                  <span
                onClick={() => handleNavigate('/Maps')}
                className={location.pathname === '/Maps' ? 'active' : ''}
              >
                    Como chegar
                  </span>
                </div>
                
                
              }
              
            </div>
            
            <div className="mid">
              <h2>Novidades</h2>
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
              <span
              onClick={() => handleNavigate('/Procedimentos')}
              className={location.pathname === '/Procedimentos' ? 'active' : 'notification'}
           
              >
                <img src={DashboardActiveIcon} alt="-" />
                Procedimentos Disponíveis
              </span>
            </div>
            <div>
              <h2>Configurações</h2>

              <span onClick={() => handleClickSubMenu('configurations')}>
                <img src={SettingsIcon} alt="" />

                Gestão

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
                    Lista de Clientes
                  </span>

                  <span
                    onClick={() => handleNavigate('/dashboard')}
                  // className={location.pathname === '/produtos-cadastrados' ? 'active' : ''}
                  >
                    Dashboard
                  </span>
                  <span
                    onClick={() => handleNavigate('/NovaConsulta')}
                  // className={location.pathname === '/produtos-cadastrados' ? 'active' : ''}
                  >
                    Cadastrar Consulta
                  </span>
                  <span
                    onClick={() => handleNavigate('/produtos-cadastrados')}
                    className={location.pathname === '/produtos-cadastrados' ? 'active' : ''}
                  >
                    Realizados
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