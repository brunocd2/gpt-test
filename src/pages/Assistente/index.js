import React, { useContext, useEffect, useState } from "react";

import {
  CardsArea,
  ChartsRow,
  DashboardFilterArea,
  DashboardHeader,
  DashboardWrapper,
  MetricProducts
} from "./styles";

import { GlobalContext } from '../../contexts/global';

import Card from './components/Card';
import InputWithIcon from '../../components/InputWithIcon';
import DefaultDashboardContainer from "./components/DefaultDashboardContainer";
import BarCharts from "./components/BarChart";
import PieChart from "./components/PieChart";

import SearchIcon from '../../assets/icons/search.png';

export default function Assistente() {
  const { user, session, products, partners, categories } = useContext(GlobalContext);
  const today = new Date();
  const [importsToday, setImportsToday] = useState([]);
  const [category, setCategory] = useState('Categoria');
  const [imports, setImports] = useState({
    thisMonth: [],
    lastMonth: [],
    diff: 0.0,
    lastMonthDate: ''
  });
  const [singleProducts, setSingleProducts] = useState({
    thisMonth: [],
    lastMonth: [],
    diff: 0.0
  });
  const [clients, setClients] = useState({
    thisMonth: [],
    lastMonth: [],
    diff: 0.0
  })
  const [pieChartData, setPieChartData] = useState([
    ["Parceiro", "Vendas"],
    ["Hippo", 0],
    ["Zaffari", 0,],
    ["Super pão", 0],
  ]);
  const [barChartData, setBarChartData] = useState([
    ['', 'Última Entrada (un)', 'Última Saída (un)'],
    ['Set', 0, 0],
    ['Out', 0, 0],
    ['Nov', 0, 0],
    ['Dez', 0, 0],
    ['Jan', 0, 0],
    ['Fev', 0, 0],
  ])
  const [dates, setDates] = useState([]);
  const [initialFilter, setInitialFilter] = useState('');
  const [finalFilter, setFinalFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const metricsHeader = ['Parceiros', 'Estoque', 'Qtd. Últ-Entrada', 'Qtd. Últ-Saída'];
  const categoriesOptions = ['Categoria', ...categories]

  const [metricsBody, setMetricsBody] = useState([]);

  function getCardsInfos(initialDate, finalDate) {
    let singleProducts = [];
    let singleProductsLastMonth = [];
    let clients = [];
    let clientsLastMonth = [];
    let importedProducts = [];
    let importedProductsLastMonth = [];
    const firstDayMonth = new Date().setDate(1);
    let productsLastMonth = products.filter(product =>
      new Date(product.created_at).getTime() < firstDayMonth
    );

    if (initialDate && finalDate) {
      importedProducts = products.filter(product => {
        const created = new Date(product.created_at).getTime();
        const updated = new Date(product.updated_at).getTime();
        const match = updated || created
        return (
          match >= initialDate.getTime() &&
          match <= finalDate.getTime()
        )
      });

      importedProductsLastMonth = products.filter(product => {
        const created = new Date(product.created_at).getTime();
        const updated = new Date(product.updated_at).getTime();
        const match = updated || created
        finalDate.setDate(1);
        return (
          match >= initialDate.getTime() &&
          match < finalDate.getTime()
        )
      });

      setImports(() => ({
        thisMonth: importedProducts,
        lastMonth: importedProductsLastMonth,
        diff: (importedProducts.length - importedProductsLastMonth.length) / importedProductsLastMonth.length * 100
      }));


      finalDate.setMonth(finalDate.getMonth() + 1);
      finalDate.setDate(finalDate.getDate() - 1);

      products.forEach(product => {
        const { codigo_acesso_principal, parceiro, created_at } = product;

        const haveGeneral = singleProducts.some(product =>
          product.codigo_acesso_principal === codigo_acesso_principal
        );
        const haveClient = singleProducts.some(product =>
          product.parceiro === parceiro
        );

        const matchTime = new Date(created_at) >= initialDate.getTime() && new Date(created_at) <= finalDate.getTime();
        if (!haveGeneral && matchTime) {
          singleProducts.push(product);
        } else {
        }
        if (!haveClient && matchTime) {
          clients.push(parceiro);
        }
      });

      productsLastMonth.forEach(product => {
        const { codigo_acesso_principal, parceiro, created_at } = product;
        const haveLastMonth = singleProductsLastMonth.some(product =>
          product.codigo_acesso_principal === codigo_acesso_principal
        );
        const haveClient = singleProductsLastMonth.some(product =>
          product.parceiro === parceiro
        );
        finalDate.setDate(1);
        const matchTime = new Date(created_at) >= initialDate.getTime() && new Date(created_at) < finalDate.getTime();
        if (!haveLastMonth && matchTime) {
          singleProductsLastMonth.push(product);
        }
        if (!haveClient && matchTime) {
          clientsLastMonth.push(parceiro);
        }
      });

      setClients(() => ({
        thisMonth: clients,
        lastMonth: clientsLastMonth,
        diff: (clients.length - clientsLastMonth.length) / clientsLastMonth.length * 100
      }));

      setSingleProducts(() => ({
        thisMonth: singleProducts,
        lastMonth: singleProductsLastMonth,
        diff: (singleProducts.length - singleProductsLastMonth.length) / singleProductsLastMonth.length * 100
      }));
    }

    const imports = products.filter(product => {
      return new Date(product.updated_at).toLocaleDateString() === today.toLocaleDateString();
    });
    setImportsToday(imports);
  }

  function getBarChartInfos(initialDate, finalDate) {
    let result = [];
    let filteredProducts = [];
    // const data = [];

    let currentDate = new Date(initialDate);
    while (currentDate <= finalDate) {
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const dateString = `${month}/${year}`;
      const dateValue = new Date(currentDate);
      result.push({ dateString, dateValue });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    finalDate.setMonth(finalDate.getMonth() + 1);
    finalDate.setDate(finalDate.getDate() - 1);

    const filtered = result.map(month => {
      filteredProducts = products.filter(product => {
        const date = new Date(product.created_at).getTime();
        let finalMonth = new Date(month.dateValue);
        finalMonth.setMonth(month.dateValue.getMonth() + 1);

        if (category === 'Categoria') {
          return (
            date >= month.dateValue.getTime() &&
            date < finalMonth.getTime()
          )
        } else {
          return (
            category === product.categoria &&
            date >= month.dateValue.getTime() &&
            date < finalMonth.getTime()
          )
        }
      });
      return ({
        month,
        array: filteredProducts,
      })
    })
    const data = filtered.map(element => {
      let entry = 0;
      let exit = 0;
      element.array.forEach(product => {
        entry = entry + parseInt(product.qtd_ult_compra);
        exit = exit + parseInt(product.qtd_ult_saida);
      })
      return ([
        element.month.dateString,
        entry,
        exit,
      ]
      )
    })
    setBarChartData([
      ['', 'Última Entrada (un)', 'Última Saída (un)'],
      ...data
    ])
  }

  function getPieChartInfos(initialDate, finalDate) {
    const data = partners.map(partner => {
      let total = 0;
      const productsPartner = products.filter(product => {
        const date = new Date(product.created_at).getTime();
        if (initialDate && finalDate) {
          if (category === 'Categoria') {
            return (
              product.parceiro === partner &&
              date >= initialDate.getTime() &&
              date <= finalDate.getTime()
            )
          } else {
            return (
              category === product.categoria &&
              product.parceiro === partner &&
              date >= initialDate.getTime() &&
              date <= finalDate.getTime()
            )
          }

        } else {
          return product.parceiro === partner
        }
      });
      productsPartner.forEach(product => {
        if (product.qtd_ult_saida) {
          total = total + parseInt(product.qtd_ult_saida);
        }
      });
      return [partner, total]
    })
    setPieChartData([
      ['Parceiro', 'Entradas'],
      ...data
    ])
  }

  function handleSearch() {
    setSelectedProduct(() =>
      products.find(product => product.descricao_produto === search)
    );
    const initialDateArray = initialFilter.split('/');
    const finalDateArray = finalFilter.split('/');
    const initialDate = new Date(initialDateArray[1], parseInt(initialDateArray[0]) - 1, 1);
    let finalDate = new Date(finalDateArray[1], parseInt(finalDateArray[0]) - 1);
    finalDate.setMonth(finalDate.getMonth() + 1);
    finalDate.setDate(finalDate.getDate() - 1);

    getBarChartInfos(initialDate, finalDate);
  }

  function getMetrics(initialDate, finalDate) {
    const metrics = partners.map(partner => {
      const filtered = products.filter(product => {
        const { categoria, created_at, updated_at, parceiro } = product;
        const created = new Date(created_at).getTime();
        const updated = new Date(updated_at).getTime();
        const match = updated || created
        if (category === 'Categoria') {
          return (
            partner === parceiro &&
            match >= initialDate.getTime() &&
            match <= finalDate.getTime()
          )
        } else {
          return (
            category === categoria &&
            partner === parceiro &&
            match >= initialDate.getTime() &&
            match <= finalDate.getTime()
          )
        }
      })
      let result = [partner];
      let stock = 0;
      let amountLastExit = 0;
      let amountEntry = 0;
      filtered.forEach(product => {
        const { qtd_ult_compra, qtd_ult_saida, estq_disponivel } = product;
        if (estq_disponivel) {
          stock = stock + Math.trunc(Number(estq_disponivel));
        }
        if (qtd_ult_compra) {
          amountEntry = amountEntry + Math.trunc(Number(qtd_ult_compra));
        }
        if (qtd_ult_saida) {
          amountLastExit = amountLastExit + Math.trunc(Number(qtd_ult_saida));
        }
      })
      result.push(stock + ' un.', amountEntry + ' un.', amountLastExit + ' un.');
      return result
    });
    setMetricsBody(metrics);
  }

  useEffect(() => {
    setDates(() => {
      let months = [];
      months.push(`${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`);
      for (let i = 1; i <= 4; i++) {
        const pastData = new Date();
        pastData.setMonth(today.getMonth() - i);
        months.push(`${(pastData.getMonth() + 1).toString().padStart(2, '0')}/${pastData.getFullYear()}`);
      }
      setInitialFilter(months[4]);
      setFinalFilter(months[0]);
      return months;
    })
    // getPieChartInfos();
    // getCardsInfos();
    // getBarChartInfos();
  }, []);

  useEffect(() => {
    const initialDateArray = initialFilter.split('/');
    const finalDateArray = finalFilter.split('/');
    const initialDate = new Date(initialDateArray[1], parseInt(initialDateArray[0]) - 1, 1);
    let finalDate = new Date(finalDateArray[1], parseInt(finalDateArray[0]) - 1);
    finalDate.setMonth(finalDate.getMonth() + 1);
    finalDate.setDate(finalDate.getDate() - 1);

    getPieChartInfos(initialDate, finalDate);
    getCardsInfos(initialDate, finalDate);
    getBarChartInfos(initialDate, finalDate);
    getMetrics(initialDate, finalDate);
  }, [initialFilter, finalFilter, category]);

  useEffect(() => {
    selectedProduct && setSelectedProduct(null);
    setSearchResult(() =>
      search
        ? products.filter(product => product.descricao_produto.includes(search.toUpperCase()))
        : []
    )
  }, [search]);

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <div>
          <h1>Olá, {session.name}</h1>
          <small>Bem vindo(a) de volta!</small>
        </div>
        <img src={user.avatar} alt={session.name} />
        <center><h2>Olá eu sou a Lalá, sua esteticista virtual. Estou aqui para tirar suas duvidas sobre procedimentos, agendamentos, preços, cuidados pré e pós operatórios etc. Tudo que sei foi minha mãe Laissa que me ensinou então fique tranquilo(@)</h2></center>
        <center><img src="https://i.pinimg.com/474x/56/4e/de/564edecf02ba72bbe285ea304c013f76.jpg" width="200px"/></center>

    </DashboardHeader><CardsArea>
        <div className="cards">
          <div>
            <iframe width="110%" frameborder="0" margin-left="-2.5px" height="800px" src="https://brunopersona-power-stetic.hf.space"></iframe>

          </div>

        </div>

      </CardsArea>

         </DashboardWrapper>
  )
}
