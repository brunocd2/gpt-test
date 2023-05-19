import DefaultDashboardContainer from './DefaultDashboardContainer';
import { Chart } from 'react-google-charts'
import { PieChartLegendValue } from '../styles';

export default function PieChart({ data }) {
  const colors = ["#784EDE", "#00ADDD", "#f7b2d1"];

  const options = {
    pieHole: 0.4,
    colors,
    legend: 'none',
    pieSliceTextStyle: {
      fontSize: 15,
    },
    pieSliceText: 'value',

    chartArea: {
      width: '100%',
      height: '80%'
    },
  };

  return (
    <DefaultDashboardContainer title="Saídas x Procedimento (Categoria)" isChart isPieChart>
      <Chart
        chartType='PieChart'
        data={data}
        options={options}
        width="100%"
        height="250px"
      />

      <legend className='pieChartLegend'>
        {data.map((row, index) =>
          index > 0 &&
          <PieChartLegendValue
            key={index}
            color={colors[index - 1]}
          >
            {row.map(el =>
              <span>{el}</span>
            )}
            {/* <span>{partner.label}</span> */}
          </PieChartLegendValue>
        )}
      </legend>
    </DefaultDashboardContainer>
  )
}