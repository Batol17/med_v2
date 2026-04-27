import { Card, Badge } from "react-bootstrap"
import "./OrderListCard.css"
import userImg from "../../assets/logo.png"

export default function OrderListCard({order}){

const statusMap = {

new:{
label:"جديد",
class:"orders-status-new"
},

processing:{
label:"قيد التنفيذ",
class:"orders-status-processing"
},

ready:{
label:"جاهز",
class:"orders-status-ready"
}

}

const status = statusMap[order.status]

return (

<Card className="orders-list-card">

<Card.Body className="orders-list-body">

{/* يمين */}
<div className="orders-list-right">

<Badge className={`orders-status ${status.class}`}>
<span className="dot"></span>
{status.label}
</Badge>

<div className="orders-list-info">
<span className="orders-list-id">#{order.id}</span>
<span className="orders-list-time">منذ {order.time}</span>
</div>

</div>

{/* وسط */}
<div className="orders-list-center">

<div className="orders-user">

<img src={userImg} alt="" />

<div>
<p className="orders-name">{order.client}</p>
<p className="orders-username">@{order.client}</p>
</div>

</div>

<div className="orders-meds">
{order.meds.length} أدوية
</div>

</div>

{/* يسار */}
<div className="orders-list-left">

<span className="orders-payment">COD</span>

</div>

</Card.Body>

</Card>

)

}