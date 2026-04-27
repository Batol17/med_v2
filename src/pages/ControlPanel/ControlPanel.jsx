import { useOutletContext } from "react-router-dom"
import { BarChartFill } from "react-bootstrap-icons"

import StatsCards from "../../components/statsCards/StatsCards"
import EmergencyOrder from "../../components/EmergencyOrder/EmergencyOrder"
import OrdersTable from "../../components/OrdersTable/OrdersTable"
import TitleHeader from "../../components/titleHeader/TitleHeader"
import icon from '../../assets/icons/control.svg'
import { Container } from "react-bootstrap"

export default function ControlPanel() {

  const { section } = useOutletContext()

  return (
    <Container fluid>

      {/* TOP */}
      {section === "top" && (
        <>
          <TitleHeader text='لوحة التحكم' icon={icon} />
          <StatsCards />
        </>
      )}

      {/* BOTTOM */}
      {section === "bottom" && (
        <>
          <EmergencyOrder />
          <OrdersTable />
        </>
      )}

    </Container>
  )
}