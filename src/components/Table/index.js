import { TableWrapper } from "./styles";

export default function Table({ header, body }) {
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            {header.map((th, index) => 
              <th className={index === 2 || index === 5 ? "bigger" : ''} key={index}>{th}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {body.map((row, index) => 
            <tr key={index}>
              {row.map((td, index) => 
                <td key={index} className={index === 2 || index === 5 ? "bigger" : ''}>{td}</td>)
              }
            </tr>  
          )}
        </tbody>
      </table>
    </TableWrapper>
  )
}