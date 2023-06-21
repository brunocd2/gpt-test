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

export default function Procedimentos() {
  const [permissions, setPermissions] = useState([
    'Eletroterapia', 'Ultrasom Estético', 'Radiofreqüência Estética', 'Laserterapia', 'Peelings químicos e Mecânicos', 'Carboxiterapia', 'Intradermoterapia', 'Aplicação de toxina botulínica','preenchimentos na derme','Fios de sustentação'
  ])

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    newUser({ name, last_name: lastName, email }).then(() => {
      toastSuccess("Consulta agendada com sucesso!");

      setIsLoading(false);
      setName('');
      setEmail('');
      setLastName('');
    }).catch(err => {
      toastError("Erro ao cadastrar Consulta");
      setIsLoading(false);
      console.log(err);
    });
  }

  return (
    <CreateUserWrapper>
      <Toaster position="top-right" reverseOrder={false} />
      <br></br>
      <div className="cards">
          <div>
            <iframe width="100%" frameborder="0" margin-left="-2.5px" height="800px" src="https://linkbio.co/5062113cmMYS9"></iframe>

          </div>

        </div>

    </CreateUserWrapper>
  )
}
