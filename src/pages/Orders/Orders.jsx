import { Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"

import OrderCard from "../../components/OrderCard/OrderCard"
import OrderListCard from "../../components/OrderListCard/OrderListCard"
import TitleHeader from "../../components/titleHeader/TitleHeader"

import iconR from '../../assets/icons/Group1.svg'
import iconRH from '../../assets/icons/Group1H.svg'
import iconL from '../../assets/icons/Group2.svg'
import iconLH from '../../assets/icons/Group2H.svg'
import icon from '../../assets/icons/order.svg'

import "./Orders.css"

export default function Orders() {

  const { section } = useOutletContext()
  const [viewMode, setViewMode] = useState("grid")

  const orders = [
    {
      id:"ORD-55",
      status:"new",
      time:"5 دقائق",
      client:"فادي_66",
      meds:["بنادول x3","أوميبرازول x1"]
    },
    {
      id:"ORD-56",
      status:"processing",
      time:"10 دقائق",
      client:"فادي_66",
      meds:["بنادول x3","أوميبرازول x1"]
    },
    {
      id:"ORD-57",
      status:"ready",
      time:"30 دقيقة",
      client:"فادي_66",
      meds:["بنادول x3","أوميبرازول x1"]
    }
  ]

  return (
    <Container className="orders-page-container">

      {/* TOP */}
      {section === "top" && (
        <TitleHeader text=' إدارة الطلبات ' icon={icon} />
      )}

      {/* BOTTOM */}
      {section === "bottom" && (
        <>
          {/* أيقونات التبديل */}
          <div className="orders-view-icons">

            <img 
              src={viewMode === "grid" ? iconRH : iconR}
              alt="grid view"
              onClick={()=>setViewMode("grid")}
            />

            <img 
              src={viewMode === "list" ? iconLH : iconL}
              alt="list view"
              onClick={()=>setViewMode("list")}
            />

          </div>

          {/* التابات */}
          <div className="orders-page-tabs">

            <span className="orders-page-tab orders-page-tab-active">
              الكل (52)
            </span>

            <span className="orders-page-tab">
              جديد (8)
            </span>

            <span className="orders-page-tab">
              قيد التنفيذ (12)
            </span>

            <span className="orders-page-tab">
              جاهز (7)
            </span>

            <span className="orders-page-tab">
              مكتمل (25)
            </span>

          </div>

          {/* عرض الطلبات */}
          <Row className="orders-page-grid">

            {orders.map(order => (

              <Col 
                xs={12}
                md={viewMode === "grid" ? 6 : 12}
                key={order.id}
              >

                {viewMode === "grid" ? (
                  <OrderCard order={order}/>
                ) : (
                  <OrderListCard order={order}/>
                )}

              </Col>

            ))}

          </Row>
        </>
      )}

    </Container>
  )
}