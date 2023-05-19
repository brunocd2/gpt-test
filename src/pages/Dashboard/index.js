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

export default function Dashboard() {
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
    ["Procedimentos", "Vendas"],
    ["Eletroterapia", 0],
    ["Peelings ", 0,],
    ["Carboxiterapia", 0],
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

  const metricsHeader = ['Procedimento',  'Qtd. Últ-Entrada', 'Qtd. Últ-Saída'];
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
          <h1>Olá, {session.name} </h1>
          <small>Bem vindo(a) de volta!</small>
        </div>
        <img src={user.avatar} alt={session.name} />
      </DashboardHeader>

      <DashboardFilterArea>
        <div>
          <label>Período:</label>
          <div>
            <select value={initialFilter} onChange={(e) => setInitialFilter(e.target.value)}>
              {dates.map(date => <option key={date} value={date}>{date}</option>)}
            </select>

            <span />

            <select value={finalFilter} onChange={(e) => setFinalFilter(e.target.value)}>
              {dates.map(date => <option key={date} value={date}>{date}</option>)}
            </select>
          </div>
        </div>

      </DashboardFilterArea>

      <CardsArea>
        <div className="cards">
          <div>
            <select
              onChange={e => setCategory(e.target.value)}
              value={category}
            >
              {categoriesOptions.map(category =>
                <option value={category} key={category}>{category}</option>)}
            </select>
          </div>

          <ChartsRow>
            <BarCharts data={barChartData} />
          </ChartsRow>

          <PieChart data={pieChartData} />

          <div className="cardRow" >
            <Card
              title="Clientes Novos"
              value={clients.thisMonth.length + ` clientes`} gains={clients.diff.toFixed(2)}
              detail={clients.lastMonth.length + " clientes - último mês"}
            />
          </div>

          <Card
            title="Total Geral de Procedimentos"
            value={imports.thisMonth.length + " un."} gains={imports.diff.toFixed(2)}
            detail={imports.lastMonth.length + " un. - último mês"}
          />

          <Card
            title="Total Geral de Procedimentos ùnicos"
            value={singleProducts.thisMonth.length + " un."} gains={singleProducts.diff.toFixed(2)}
            detail={singleProducts.lastMonth.length + " un - último mês"}
          />

          <Card title="Procedimentos Realizadas Hoje" value={importsToday.length + " unidades"} noComparison />
          <div className="filterProducts">
            <InputWithIcon
              placeholder="Filtre por procedimento"
              setValue={setSearch}
              value={search}
              onEnter={handleSearch}
              right={{ src: SearchIcon, onClick: handleSearch }}
            />
            {searchResult.length > 0 && !selectedProduct &&
              <div className="searchResult">
                {searchResult.map((product, index) =>
                  <span key={index} onClick={() => setSearch(product.descricao_produto)}>
                    {product.descricao_produto}
                  </span>
                )}
              </div>
            }
          </div>

          {selectedProduct &&
            <DefaultDashboardContainer title="Resumo do Procedmento">
              <h3>{selectedProduct.descricao_produto}</h3>
              <ul>
                <li>Cliente: {selectedProduct.parceiro}</li>
                <li>Categoria: {selectedProduct.categoria}</li>
                <li>Procedimento: {selectedProduct.exportador}</li>
                <span />

                <li>Data Entrada: {selectedProduct.dta_ult_compra && new Date(selectedProduct.dta_ult_compra).toLocaleDateString()}</li>
                <li>Data Saída: {selectedProduct.dta_ult_saida && new Date(selectedProduct.dta_ult_saida).toLocaleDateString()}</li>
                <span />

                <li>Preço Entrada: R${selectedProduct.custo_ult_compra_cd.toFixed(2)}</li>
                <li>Preço Saída: R${selectedProduct.preco_vda_alvim.toFixed(2)}</li>
              </ul>
            </DefaultDashboardContainer>
          }
        </div>

      </CardsArea>

      <MetricProducts>
        <h2>{category === 'Categoria' ? 'Métricas' : `Métricas da categoria: ${category}`}</h2>

        <table>
          <thead>
            <tr>{metricsHeader.map((th, index) =>
              <React.Fragment key={index}>
                <th className={index > 1 ? 'center' : ''}>{th}</th>
              </React.Fragment>
            )}</tr>
          </thead>

          <tbody>
            {metricsBody.map((tr, index) =>
              <tr key={index}>
                {tr.map((td, tdIndex) =>
                  <React.Fragment key={tdIndex}>
                    <td className={tdIndex > 1 ? 'center' : ''}>{td}</td>
                  </React.Fragment>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </MetricProducts>
    </DashboardWrapper>
  )
}