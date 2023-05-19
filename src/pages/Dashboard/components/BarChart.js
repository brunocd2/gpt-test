import DefaultDashboardContainer from './DefaultDashboardContainer';
import { Chart } from 'react-google-charts'

export default function BarChart({ data }) {
  const windowWidth = window.screen.width;

  const options = {
    colors: ["#f7b2d1", "#4BD4FA"],
    legend: {
      // textStyle: {color: 'blue'}
      position: windowWidth < 800 ? 'none' : 'top'
    },
    hAxis: {
      format: 'decimal'
    }
  }

  return (
    <DefaultDashboardContainer title="Fluxo de Procedimentos (Categoria)" isChart isBarChart>
      <Chart
        chartType='Bar'
        data={data}

        options={{ ...options }}
        width="100%"
        height="250px"
      />
    </DefaultDashboardContainer>
  )
}