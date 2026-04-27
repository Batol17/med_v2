import { Table, Button } from "react-bootstrap"
import "./OrdersTable.css"

export default function OrdersTable() {

  const orders = [
    { id: 45689, customer: "فادي احمد", time: "5 دقائق", status: "جديد" },
    { id: 45690, customer: "علي الحسن", time: "15 دقيقة", status: "قيد المعالجة" },
    { id: 45691, customer: "فادي احمد", time: "15 دقيقة", status: "قيد المعالجة" },
    { id: 45692, customer: "فادي احمد", time: "30 دقيقة", status: "قيد المعالجة" },
    { id: 45693, customer: "علي الحسن", time: "1 ساعة", status: "مكتمل" },
  ]

  return (
    <Table bordered hover className="text-center bg-white thick-table">
      
      <thead>
        <tr>
          <th>رقم الطلب</th>
          <th>الزبون</th>
          <th>الوقت المنقضي</th>
          <th>الحالة</th>
          <th>عرض</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.time}</td>
            <td>{order.status}</td>
            <td>
              <Button size="sm" className="px-3">
                عرض
              </Button>
            </td>
          </tr>
        ))}
      </tbody>

    </Table>
  )
}