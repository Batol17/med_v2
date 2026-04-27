import { Row, Col, Card, Container } from "react-bootstrap"

import icon1 from '../../assets/icons/fileText.svg'
import icon2 from '../../assets/icons/restfast.svg'
import icon3 from '../../assets/icons/hour.svg'

import './StatsCards.css'

export default function StatsCards() {

  const stats = [
    {
      title: "الطلبات الجديدة",
      value: 15,
      icon: icon1,
      className: "stat-blue"
    },
    {
      title: "منتجات شارفت على النفاذ",
      value: 10,
      icon: icon2,
      className: "stat-red"
    },
    {
      title: "طلبات قيد التنفيذ",
      value: 8,
      icon: icon3,
      className: "stat-green"
    }
  ]

  return (
    <Container fluid className="stats-container">

      {/* الكارد الكبير */}
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className={`stat-card ${stats[0].className}`}>
            <Card.Body className="stat-body">

              <img src={stats[0].icon} alt="" className="stat-icon"/>

              <div className="stat-text">
                <h4>{stats[0].title}</h4>
                <h3>{stats[0].value}</h3>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* الكاردات الصغيرة */}
      <Row className="g-4 justify-content-around"  >

        {stats.slice(1).map((stat, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Card className={`stat-card ${stat.className}`}>
              <Card.Body className="stat-body">

                <img src={stat.icon} alt="" className="stat-icon"/>

                <div className="stat-text">
                  <h6>{stat.title}</h6>
                  <h5>{stat.value}</h5>
                </div>

              </Card.Body>
            </Card>
          </Col>
        ))}

      </Row>

    </Container>
  )
}