import React from 'react'
import { BarChartFill } from "react-bootstrap-icons";
import './titleHeader.css'
const TitleHeader = ({ text, icon }) => {
  return (
    <h3 className="title-header-text d-flex align-items-center gap-4 me-5">
      <img src={icon} alt="" />
      {text}
    </h3>
  )
}
export default TitleHeader