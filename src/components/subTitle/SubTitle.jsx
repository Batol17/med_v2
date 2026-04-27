import React from "react"
import './SubTitle.css'
import icon from '../../assets/icons/notify.svg'
export const SubTitle = ({ minicon, text }) => {
  return (
    <div className=" d-flex align-items-center gap-2 mb-4 ">
      {icon &&  <img src={minicon} alt="" />}
      <h3 className="m-0 sub-title-text">{text}</h3>
    </div>
  )
}