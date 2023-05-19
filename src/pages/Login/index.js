import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginLeftWrapper, LoginRightWrapper } from "./styles";

import Logo from '../../assets/logo.png';
import LogoMobile from '../../assets/logoMobile.png';
import MailIcon from '../../assets/icons/mail.png';
import VisibilityIcon from '../../assets/icons/visibility.png';
import VisibilityOffIcon from '../../assets/icons/visibility_off.png';
import LockIcon from '../../assets/icons/lock.png';
import InputWithIcon from "../../components/InputWithIcon";
import Button from "../../components/Button";
import { getAllProducts, getUsers, login } from "../../services/api";
import { GlobalContext } from '../../contexts/global';
import Loading from "../../components/Loading";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    setProducts,
    setSession,
    setCategories,
    setPartners,
    setUsers
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  function handleChangeVisibility() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError('Preencha os campos corretamente');
    } else {
      setIsLoading(true);

      login({
        email,
        password
      }).then((data) => {
        setSession({
          email, password,
          ...data
        });

        getAllProducts().then(products => {
          setIsLoading(false);
          setProducts(products);

          let categories = [];
          let partners = [];

          products.forEach(product => {
            if (!categories.some(category => category === product.categoria)) {
              categories.push(product.categoria);
            }
            if (!partners.some(partner => partner === product.parceiro)) {
              partners.push(product.parceiro);
            }
          });

          setCategories(categories);
          setPartners(partners);

          data.first_acess
            ? navigate('/primeiro-acesso')
            : navigate('/assistente-virtual');
        });

        getUsers().then(users => setUsers(users));
      }).catch(error => {
        console.log(error);
        setIsLoading(false);

        if(error.code === "ERR_NETWORK") {
          setError('Erro Interno. Entre em contato com o suporte.');
        } else {
          setError('Verifique as credenciais!');
        }
      });
    }
  }

  useEffect(() => {
    setError('');
  }, [email, password])

  return (
    <>
      <LoginLeftWrapper>
        <img src={Logo} alt="domazzi" />
        <h2>Bem vindo(a) ao <br /> Esteticista Virtual Laissa Pacheco.</h2>
      </LoginLeftWrapper>

      <LoginRightWrapper>
        <img src={LogoMobile} alt="domazzi" />

        <center>
          <h3>Saiba tudo sobre procedimentos, preços, pré e pós operatórios<br /> Esteticista Virtual Laissa Pacheco</h3>
        </center>

        <form onSubmit={handleSubmit}>
          <InputWithIcon
            placeholder="Insira seu e-mail"
            type="email"
            value={email} setValue={setEmail}
            left={{ src: MailIcon }}
          />

          <InputWithIcon
            placeholder="Insira sua senha"
            value={password} setValue={setPassword}
            left={{ src: LockIcon, }}
            right={{
              src: showPassword ? VisibilityOffIcon : VisibilityIcon,
              onClick: handleChangeVisibility
            }}
            type={showPassword ? 'text' : 'password'}
          />

          {error && <span className="error">{error}</span>}

          <Link to="/nova-senha">Esqueceu a senha?</Link>
          <Button color="branding" text="Acessar" />
        </form>

        <Loading isLoading={isLoading} />
      </LoginRightWrapper>
    </>
  )
}