import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from '../../assets/logo.png';
import LogoMobile from '../../assets/logoMobile.png';
import VisibilityIcon from '../../assets/icons/visibility.png';
import VisibilityOffIcon from '../../assets/icons/visibility_off.png';
import LockIcon from '../../assets/icons/lock.png';
import InputWithIcon from "../../components/InputWithIcon";
import Button from "../../components/Button";
import { GlobalContext } from '../../contexts/global';
import Loading from "../../components/Loading";
import { LoginLeftWrapper, LoginRightWrapper } from "../Login/styles";
import { firstAccess } from "../../services/api";

export default function FirstAccess() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setSession, session } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('Preencha os campos!');
    } else if (newPassword !== confirmPassword) {
      setError('Verifique as senhas digitas!');
    } else {
      setIsLoading(true);

      firstAccess(session, newPassword)
        .then(() => {
          navigate('/assistente-virtual');
        }).catch((err) => {
          setError('Falha ao atualizar senha!');
          console.log(err);

          setIsLoading(false);
        })
    }
  }

  return (
    <>
      <LoginLeftWrapper>
        <img src={Logo} alt="CD2 GPT Super" />
        <h2>Bem vindo(a) ao <br /> Esteticista Virtual Laissa Pacheco.</h2>
      </LoginLeftWrapper>

      <LoginRightWrapper>
        <img src={LogoMobile} alt="CD2 GPT Super" />
        <h2>Este é seu primeiro <br /> acesso na aplicação.</h2>
        <p>Crie uma nova senha para entrar.</p>
        <form onSubmit={handleSubmit}>
          <InputWithIcon
            label="Nova Senha" placeholder="Insira a nova senha"
            value={newPassword} setValue={setNewPassword}
            left={{ src: LockIcon }}
            right={{
              src: showNewPassword ? VisibilityOffIcon : VisibilityIcon,
              onClick: () => setShowNewPassword(!showNewPassword)
            }}
            type={showNewPassword ? 'text' : 'password'}
          />

          <InputWithIcon
            label="Confirmar Senha" placeholder="Confirme a senha"
            value={confirmPassword} setValue={setConfirmPassword}
            left={{ src: LockIcon, }}
            right={{
              src: showConfirmPassword ? VisibilityOffIcon : VisibilityIcon,
              onClick: () => setShowConfirmPassword(!showConfirmPassword)
            }}
            type={showConfirmPassword ? 'text' : 'password'}
          />

          {error && <span className="error">{error}</span>}

          <Button color="branding" text="Concluir" />
        </form>
        <Loading isLoading={isLoading} />
      </LoginRightWrapper>
    </>
  )
}