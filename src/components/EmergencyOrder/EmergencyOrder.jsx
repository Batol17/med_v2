import { Card, Button } from "react-bootstrap"
import { SubTitle } from "../subTitle/SubTitle"

import notifyIcon from "../../assets/icons/notify.svg"
import responseIcon from "../../assets/icons/res.svg"

import "./EmergencyOrder.css"

export default function EmergencyOrder() {
  return (
    <div className="emergency-wrapper">

      <SubTitle
        text="الطلبات الطارئة"
        minicon={notifyIcon}
        style={{margin:'14px'}}
      />

      <Card className="emergency-card border-0 mb-4">
        <Card.Body className="emergency-body">

          <strong className="emergency-txt">
            <span>طلب طارئ :</span> حالة حرجة من فادي_66
          </strong>

          <Button className="res-emergency-btn">
            <img src={responseIcon} alt="response icon" />
            استجابة فورية
          </Button>

        </Card.Body>
      </Card>

    </div>
  )
}