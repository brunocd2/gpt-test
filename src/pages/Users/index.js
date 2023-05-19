import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import InputWithIcon from "../../components/InputWithIcon";
import Button from "../../components/Button";
import Pagination from "../Products/Pagination";
import Modal from "../../components/Modal";
import { CreateUserModalContent, CreateUserWrapper } from "./styles";

import UserIcon from '../../assets/icons/user.png';
import UsersIcon from '../../assets/icons/users.png';
import EditIcon from '../../assets/icons/edit.png';
import DeleteIcon from '../../assets/icons/delete.png';
import MailIcon from '../../assets/icons/mail.png';
import SearchIcon from '../../assets/icons/search.png';
import { deleteUser, editUser, getUsers, newUser } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toast";
import { GlobalContext } from "../../contexts/global";

export default function Users() {
  const [permissions, setPermissions] = useState([
    'Administrador', 'Cliente',
  ])

  const [selectedPermission, setSelectedPermission] = useState(null);
  const { users, setUsers } = useContext(GlobalContext);
  const [body, setBody] = useState([]);
  const [name, setName] = useState('');
  const showPerPage = 10;
  const [offset, setOffset] = useState(0);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hiddenPagination, setHiddenPagination] = useState(false);

  function handleSearch() {
    setBody(() => {
      return users.filter(user => user.name.toUpperCase().startsWith(search.toUpperCase()));
    });
    setHiddenPagination(true);
  }

  function handleOpenModal() {
    setSelectedUser(null);
    setName('');
    setLastName('');
    setEmail('');
    setModalOpened(true);
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setName(user.name);
    setLastName(user.last_name);
    setEmail(user.email);
    setModalOpened(true);
  }

  function handleDelete(user) {
    setSelectedUser(user);
    setDeleteModalOpened(true);
  }

  function handleDeleteUser() {
    deleteUser(selectedUser).then(() => {
      toastSuccess("Cliente deletado com sucesso!");
      setUsers(old => old.filter(user => user.id !== selectedUser.id));
    }).catch(error => {
      toastError("Erro ao deletar Cliente!");
      console.log('Delete user error:', error);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (selectedUser) {
      editUser(selectedUser, name, lastName, email).then((editedUser) => {
        toastSuccess("Cliente editado com sucesso!");
        setIsLoading(false);
        setEmail('');
        setName('');
        setLastName('');
        setUsers(old => {
          let newUsers = [...old];
          const index = newUsers.findIndex(user => user.id === editedUser.id);
          newUsers[index] = editedUser;
          return newUsers;
        });
        setModalOpened(false);
      }).catch(err => {
        toastError("Erro ao editar Cliente");
        setIsLoading(false);
        console.log(err);
      })
    } else {
      newUser({ name, last_name: lastName, email }).then(() => {
        toastSuccess("Cliente cadastrado com sucesso!");
        setIsLoading(false);
        setEmail('');
        setName('');
        setLastName('');
        setUsers(old => [...old, { name, lastName, email }]);
        setModalOpened(false);
      }).catch(err => {
        toastError("Erro ao cadastrar Cliente");
        setIsLoading(false);
        console.log(err);
      });
    }
  }

  useEffect(() => {
    setBody(() =>
      users.slice(offset, offset + Number(showPerPage))
    )
  }, [offset, showPerPage]);

  useEffect(() => {
    setOffset(0);
  }, [showPerPage]);

  useEffect(() => {
    setBody(() =>
      users.slice(offset, offset + Number(showPerPage))
    )
  }, [users]);

  useEffect(() => {
    !modalOpened && setSelectedUser(null);
  }, [modalOpened]);

  useEffect(() => {
    getUsers().then(response => setUsers(response));
  }, []);

  useEffect(() => {
    if (!search) {
      setHiddenPagination(false);
      setBody(() =>
        users.slice(offset, offset + Number(showPerPage))
      )
    }
  }, [search]);

  return (
    <CreateUserWrapper>
      <Modal opened={modalOpened} setOpened={setModalOpened} customModalContent>
        <CreateUserModalContent>
          <header>
            <h2>{selectedUser ? 'Editar Cliente' : 'Cadastrar novo Cliente'}</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <span className="row">
              <InputWithIcon
                placeholder="Insira o nome"
                label="Nome"
                left={{ src: UserIcon }}
                value={name} setValue={setName}
              />
              <InputWithIcon
                placeholder="Insira o sobrenome"
                label="Watsapp"
                left={{ src: UsersIcon }}
                value={lastName} setValue={setLastName}
              />
            </span>

            <InputWithIcon
              placeholder="Insira um e-mail válido"
              label="E-mail"
              left={{ src: MailIcon }}
              value={email} setValue={setEmail}
              disabled={selectedUser}
            />

            <h2>Selecione o nível de permissão:</h2>
            <div className="permissions">
              {permissions.map((permission, index) =>
                <label key={index} onClick={() => setSelectedPermission(permission)}>
                  <input type="radio" checked={selectedPermission === permission} />
                  {permission}
                </label>
              )}
            </div>
            <footer>
              <Button color="red" text="Cancelar" onClick={() => setModalOpened(false)} type="button" />
              <Button disabled={isLoading} text={selectedUser ? "Editar" : "Cadastrar"} color="branding" />
            </footer>
          </form>
        </CreateUserModalContent>
      </Modal>

      <Modal opened={deleteModalOpened} setOpened={setDeleteModalOpened} customModalContent>
        <CreateUserModalContent>
          <header>
            <h2>Deletar Cliente</h2>
          </header>
          <form>
            <h3>Tem certeza que deseja deletar o Cliente:</h3>
            <p>Nome: <span>{selectedUser?.name} {selectedUser?.last_name}</span></p>
            <p>E-mail: <span>{selectedUser?.email}</span></p>
            <footer className="deleteFooter">
              <Button text="Cancelar" color="gray3" type="button" onClick={() => setDeleteModalOpened(false)} />
              <Button text="Deletar" color="red" type="button" onClick={handleDeleteUser} />
            </footer>
          </form>
        </CreateUserModalContent>
      </Modal>

      <Toaster position="top-right" reverseOrder={false} />
      <h1>Cadastrar novo Cliente</h1>
      <p>Aqui você encontra a lista e cadastro de Clientes.</p>
      <div className="headerRow">
        <Button text="Cadastrar Cliente" color="branding" onClick={handleOpenModal} />
        <span>
          <label>Buscar Cliente:</label>
          <InputWithIcon
            placeholder="Insira um nome"
            setValue={setSearch}
            value={search}
            onEnter={handleSearch}
            right={{ src: SearchIcon, onClick: handleSearch }}
          />
        </span>
      </div>

      <table>
        <tbody>
          {body.map((user, index) =>
            <tr key={index} className={selectedUser === user ? 'active' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUser === user}
                  onClick={() => setSelectedUser(old => old === user ? null : user)}
                />
              </td>

              <td>{user.name} {user.last_name}</td>
              <td>{user.email}</td>

              <td className="role">
                <span className={index % 2 === 0 ? "adm" : 'cli'} />
                {index % 4 === 0 ? 'Administrador' : 'Cliente'}
              </td>

              <td className="actions">
                <button onClick={() => handleEdit(user)}>
                  <img src={EditIcon} alt="" />
                </button>

                <button onClick={() => handleDelete(user)}>
                  <img src={DeleteIcon} alt="" />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!hiddenPagination &&
        <Pagination limit={showPerPage} total={users.length} offset={offset} setOffset={setOffset} showPerPage={showPerPage} />
      }
    </CreateUserWrapper>
  )
}