import { useContext, useEffect, useState } from "react";
import exportFromJSON from 'export-from-json'  

import PageContainer from "../../components/PageContainer";
import { FilterArea, FilterButton, ModalContent, ModalButton, ShowPerPageArea, ExcelButton } from "./styles";
import FilterIcon from '../../assets/icons/filter.png';
import ExcelIcon from '../../assets/icons/excel.png';
import SearchIcon from '../../assets/icons/search.png';
import InputWithIcon from "../../components/InputWithIcon";
import Table from "../../components/Table";
import Pagination from "./Pagination";
import Modal from "../../components/Modal";
import { GlobalContext } from "../../contexts/global";
import { useParams } from "react-router-dom";

export default function Products() {
  const [modalOpened, setModalOpened] = useState(false);
  const [showPerPage, setShowPerPage] = useState(15);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [body, setBody] = useState([]);
  const { products, setProducts, filteredProducts } = useContext(GlobalContext);
  const { filterType, filter } = useParams();
  const title = filterType ? `Pedidos - ${filterType}: ${filter}` : 'Agendamentos Realizados'

  const [header, setHeader] = useState(Object.keys(products[0]).map(key => key));

  const [database, setDatabase] = useState(() =>
    products.map(product => {
      const row = Object.keys(product).map(key => product[key]);
      return row;
    })
  )

  const [data, setData] = useState(database);

  const filters = [
    // {label: 'Produto', inTable: 'Descrição '},
    { label: 'Procedimento', inTable: 'codigo_acesso_principal' },
    { label: 'Data', inTable: 'exportador' },
    { label: 'Cliente', inTable: 'parceiro' },
    { label: 'Valor', inTable: 'categoria' },
    // {label: 'Ref.Parceiro', inTable: 'Referência Parceiro'},
   
  ];
  const [selectedFilters, setSelectedFilters] = useState([]);

  function handleSetShowPerPage(e) {
    e.target.value
      ? setShowPerPage(e.target.value)
      : setShowPerPage(10)
  }

  function handleFilter() {
    let newData = [...products];

    selectedFilters.forEach((filter, filterIndex) => {
      if (filter.value) {
        const index = header.findIndex(element => element === filter.inTable);

        if (filterIndex === 0) {
          newData = database.filter(row => {
            return row[index].toUpperCase().includes(filter.value.toUpperCase());
          });
        } else {
          newData = newData.filter(row => {
            return row[index].toUpperCase().includes(filter.value.toUpperCase());
          });
        }
      }
    })

    setOffset(0);
    setData(newData);
    setModalOpened(false);
  }

  function handleSearch() {
    if (search) {
      let newData = database.filter(row => {
        return row[2].toUpperCase().includes(search.toUpperCase());
      });

      setData(newData);
    } else {
      setData(database);
    }
  }

  function handleExcelExport() {
    const result = data.map((arr) => {
      const obj = {};

      header.forEach((prop, i) => {
        obj[prop] = arr[i];
      });

      return obj;
    });

    exportFromJSON({
      data: result,
      fileName: 'Pedidos Delmoro',
      exportType: exportFromJSON.types.xls
    });
  }

  useEffect(() => {
    setBody(() =>
      data.slice(offset, offset + Number(showPerPage))
    )
  }, [offset, showPerPage]);

  useEffect(() => {
    setOffset(0);
  }, [showPerPage]);

  useEffect(() => {
    setBody(() =>
      data.slice(offset, offset + Number(showPerPage))
    )
  }, [data]);

  useEffect(() => {
    filteredProducts.length === 0
      ? setData(() =>
        database.map(product => {
          const row = Object.keys(product).map(key => product[key]);
          return row;
        })
      )
      : setData(() =>
        filteredProducts.map(product => {
          const row = Object.keys(product).map(key => product[key]);
          return row;
        })
      );

  }, [filteredProducts]);

  useEffect(() => {
    if (filterType) {
      const label = filterType.charAt(0).toUpperCase() + filterType.slice(1);
      setSelectedFilters([
        { label, value: filter, inTable: filterType }
      ]);
    } else {
      setSelectedFilters([]);
    }
  }, [filterType]);

  return (
    <PageContainer title={title}>
      <Modal opened={modalOpened} setOpened={setModalOpened}>
        <ModalContent>
          <header>
            <h2>Filtrar pedidos</h2>
          </header>

          <label>Selecione o filtro:</label>

          <div>
            {filters.map(filter => (
              <label key={filter.label}>
                <input
                  type="checkbox"
                  defaultChecked={selectedFilters.some(element => element.label === filter.label)}
                  value={filter.label}
                  onChange={() => {
                    setSelectedFilters(old => {
                      let newFilters = [...old];
                      const index = newFilters.findIndex(element => element.label === filter.label);
                      index === -1
                        ? newFilters.push({ ...filter, value: '' })
                        : newFilters.splice(index, 1);
                      return newFilters;
                    })
                  }}
                />

                {filter.label}
                {selectedFilters.some(element => element.label === filter.label) &&
                  <input
                    type="text"
                    placeholder="Insira a descrição"
                    defaultValue={selectedFilters.find(element => element.label === filter.label).value}
                    onChange={e => {
                      let newFilters = [...selectedFilters];
                      const index = newFilters.findIndex(element => element.label === filter.label);
                      newFilters[index].value = e.target.value;
                      setSelectedFilters(newFilters);
                    }}
                  />
                }
              </label>
            ))}
          </div>

          <div>
            <ModalButton text="Fechar" color="red" onClick={() => setModalOpened(false)} />
            <ModalButton text="Aplicar Filtro" color="branding" onClick={handleFilter} />
          </div>
        </ModalContent>
      </Modal>
      <FilterArea>
        <div>
          <FilterButton color="branding" onClick={() => setModalOpened(true)}>
            <img src={FilterIcon} alt="" />
            Filtrar por:
          </FilterButton>

          <ExcelButton onClick={handleExcelExport}>
            <img src={ExcelIcon} alt="" />
            Exportar Excel
          </ExcelButton>
        </div>

        <div>
          <label>
            <InputWithIcon
              placeholder="Busque por um título"
              right={{ src: SearchIcon, onClick: () => handleSearch() }}
              value={search}
              onEnter={handleSearch}
              setValue={setSearch}
            />
          </label>
        </div>
      </FilterArea>

      <ShowPerPageArea>
        <label>Mostrar</label>

        <input type="number" value={showPerPage} onChange={handleSetShowPerPage} inputMode="numeric" pattern="\d*" min={0} />
        <label>Pedidos por página</label>
      </ShowPerPageArea>

      <Table header={header} body={body} />

      <Pagination limit={showPerPage} total={data.length} offset={offset} setOffset={setOffset} showPerPage={showPerPage} />
    </PageContainer>
  )
}