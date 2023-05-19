import { DefaultDashboardWrapper } from "../styles";

export default function DefaultDashboardContainer({ title, isChart, isBarChart, isPieChart, children }) {
  return (
    <DefaultDashboardWrapper isChart={isChart} isPieChart={isPieChart} isBarChart={isBarChart}>
      <header>
        <h3>{title}</h3>
        <span>...</span>
      </header>
      <div className="content">
        {children}
      </div>
    </DefaultDashboardWrapper>
  )
}