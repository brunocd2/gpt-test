import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  const [user, setUser] = useState({
    name: "Domazzi", avatar: "https://www.w3schools.com/howto/img_avatar.png"
  });
  const [notifications, setNotifications] = useState([
    {title: 'Um novo relatório mensal está pronto para download!', description: 'O relatório mensal de Operações está pronto para visualização e Download. Verifique todos os dados presentes no relatório.', type: 'description', date: '06/02/2023',
      file: {title: 'Relatório teste.pdf', type: 'pdf'}    
    },
    {title: 'Um novo relatório financeiro está disponível para visualização!', description: 'Em breve!', type: 'payments', date: '06/02/2023'},
    {title: 'Notamos gastos anormalmente altos no mês de Fevereiro.', description: 'Em breve!', type: 'warning', date: '06/02/2023'},
  ]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [session, setSession] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <GlobalContext.Provider value={{
      user, setUser, 
      users, setUsers,
      notifications, setNotifications,
      products, setProducts,
      categories, setCategories,
      partners, setPartners,
      session, setSession,
      filteredProducts, setFilteredProducts
    }}>
      {children}
    </GlobalContext.Provider>
  )
}