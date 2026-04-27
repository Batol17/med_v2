import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom"

export default function MainLayout() {

  return (

    <Container  className="min-vh-100 p-0 overflow-hidden">

      {/* الصف الأول */}
      <Row className="align-items-start g-0 h-100 p-0">

        <Col lg={2} md={3} sm={4}>
          <Sidebar />
        </Col>

        <Col lg={10} md={9} sm={8} className="py-4 overflow-auto ">
          {/* هنا العنوان والـ Stats */}
          <Outlet context={{ section: "top" }} />
        </Col>

      </Row>

      {/* الصف الثاني */}
      <Row>

        <Col md={12} className="p-4 mx-3">
          <Outlet context={{ section: "bottom" }} />
        </Col>

      </Row>

    </Container>

  )

}