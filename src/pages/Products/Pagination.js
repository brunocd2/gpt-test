import { PaginationArea } from "./styles";

const MAX_ITEMS = 5;
const MAX_LEFT = (MAX_ITEMS - 1) / 2; 

export default function Pagination({ limit, total, offset, setOffset, showPerPage }) {
  const currentPage = offset ? (offset / limit) + 1 : 1;
  const totalPages = Math.ceil(total / limit);
  const firstPage = Math.max(currentPage - MAX_LEFT, 1); 
  const lastItem = offset + Number(showPerPage);

  function handlePageChange(page){
    setOffset((page - 1) * limit);
  }

  return (
    <PaginationArea>
      <div>
        Mostrando <span>{offset + 1} - {lastItem > total ? total : lastItem}</span> de <span>{total}</span> produtos
      </div>
      <ul>
        <li 
          className="previous"
          onClick={() => {
            currentPage !== 1 && handlePageChange(currentPage - 1)}
          }
        >
          Anterior
        </li>
        {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
          .map((_, index) => index + firstPage)
          .map((page) => {
            if(page <= totalPages) {
              return (
                <li 
                  key={page} 
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </li>
            )}
          })}
          <li 
            className="next"
            onClick={() => {
              currentPage < totalPages && handlePageChange(currentPage + 1)}
            }
          >
            Próximo
          </li>
      </ul>
    </PaginationArea>
  )
}