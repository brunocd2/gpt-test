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
      <br></br>

<br></br>
      <h3>Procedimentos Da Nossa Estética</h3>
      
      <br></br>
        <span className="row">
        <h5>*  Ultrasom Estético

</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Massagem Modeladora, Relaxante ou Linfática  

</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Peelings químicos e Mecânicos 

</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Spa de Noivas</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Spa de Sobrancelhas</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Detox Facial de toxina botulínica</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Cílios</h5>

</span>
<br></br>
        <span className="row">
        <h5>*  MicroPigmentação de Sobrancelhas</h5>

</span>
<br></br>
        <span className="row">
        <h5>* MicroPigmentação de Lábios</h5>

</span>
<br></br>
        <span className="row">
        <h5>* HidraGloss</h5>

</span>
<br></br>
        <span className="row">
        <h5>* Aplicação de substâncias para fins estéticos por via intramuscular</h5>

</span>


    </CreateUserWrapper>
  )
}
