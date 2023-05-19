import { useState } from "react";
import InputWithIcon from "../../components/InputWithIcon";
import Button from "../../components/Button";
import { CreateUserWrapper } from "./styles";

import UserIcon from '../../assets/icons/user.png';
import UsersIcon from '../../assets/icons/users.png';
import MailIcon from '../../assets/icons/mail.png';
import { newUser } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toast";
import { Toaster } from "react-hot-toast";

export default function CreateUser() {
  const [permissions, setPermissions] = useState([
    'Administrador', 'Cliente', 
  ])

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    newUser({ name, last_name: lastName, email }).then(() => {
      toastSuccess("Cliente cadastrado com sucesso!");

      setIsLoading(false);
      setName('');
      setEmail('');
      setLastName('');
    }).catch(err => {
      toastError("Erro ao cadastrar Cliente");
      setIsLoading(false);
      console.log(err);
    });
  }

  return (
    <CreateUserWrapper>
      <Toaster position="top-right" reverseOrder={false} />
      <br></br>
      <br></br>

<br></br>
      <h3>Novo Cliente</h3>
      
      <form onSubmit={handleSubmit}>
        <span className="row">
          <InputWithIcon
            placeholder="Nome *"
            left={{ src: UserIcon }}
            value={name} setValue={setName}
          />
</span>
<span className="row">
          <InputWithIcon
            placeholder="Watsapp *"
            left={{ src: UsersIcon }}
            value={lastName} setValue={setLastName}
          />
        </span>

        <InputWithIcon
          placeholder="E-mail *"
          left={{ src: MailIcon }}
          value={email} setValue={setEmail}
        />

        <h2>Selecione o Perfil</h2>

        <div className="permissions">
          {permissions.map((permission, index) =>
            <label key={index}>
              <input type="checkbox" />{permission}
            </label>
          )}
        </div>

        <Button disabled={isLoading} text="Cadastrar" color="branding" />
      </form>
    </CreateUserWrapper>
  )
}
