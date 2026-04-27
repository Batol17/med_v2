import { Card, Badge, Button } from "react-bootstrap"
import "./OrderCard.css"
import userImg from "../../assets/images/user.png"
import presImg from "../../assets/images/wsf.jpg"

export default function OrderCard({order}){

const statusMap = {
new:{ label:"جديد", class:"orders-status-new" },
processing:{ label:"قيد التنفيذ", class:"orders-status-processing" },
ready:{ label:"جاهز", class:"orders-status-ready" }
}

const status = statusMap[order.status]

return (

<Card className="orders-card">

<Card.Body>

{/* HEADER */}
<div className="orders-card-header">

<Badge className={`orders-status ${status.class}`}>
{status.label} <span className="dot"></span>
</Badge>
<h3 className="order-card-title">#ORD-55 | |منذ 5 دقائق</h3>

</div>

<hr/>

{/* USER */}
<div className="orders-user">

<img src={userImg} alt=""/>

<h5>{order.client}</h5>

</div>

{/* DETAILS */}
<div className="orders-details">

<p>
<strong>العميل :</strong> {order.client}
</p>

<p>
<strong>الأدوية :</strong>
</p>

<ul>
{order.meds.map((m,i)=>(
<li key={i}>{m}</li>
))}
</ul>

</div>

{/* prescription + payment */}
<div className="orders-middle">

<img src={presImg} alt="" className="orders-prescription"/>

<span className="orders-card-payment">
COD
</span>

</div>

{/* ACTIONS */}
<div className="orders-card-actions">

{order.status==="new" && (
<>
<Button className="orders-btn-reject">
✕ رفض
</Button>

<Button className="orders-btn-accept">
✓ قبول
</Button>
</>
)}

{order.status==="processing" && (
<Button className="orders-btn-done">
تم التنفيذ
</Button>
)}

{order.status==="ready" && (
<Button className="orders-btn-deliver">
تم التسليم
</Button>
)}

</div>

</Card.Body>

</Card>

)
}