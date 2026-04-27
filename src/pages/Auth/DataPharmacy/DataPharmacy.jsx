import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { usePharmacyInfoMutation } from "../../../redux/features/auth/authApi";

import facebookIcon from "../../../assets/icons/facebook.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";
import twitterIcon from "../../../assets/icons/twitter.svg";
import chromeIcon from "../../../assets/icons/website.svg";
import uploadIcon from "../../../assets/icons/upload.svg";

import "./DataPharmacy.css";

const DataPharmacy = () => {
  const { section } = useOutletContext();
  const [activeTab, setActiveTab] = useState("الوصف");
  const [showHours, setShowHours] = useState(false);
  const navigate = useNavigate();
  const [pharmacyInfo, { isLoading }] = usePharmacyInfoMutation();

  const tabs = ["الوصف", "الصور *", "روابط"];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    location: "",
    workingDays: "",
    morningOpen: "",
    morningClose: "",
    eveningOpen: "",
    eveningClose: "",
    description: "",
    facebook: "",
    instagram: "",
    twitter: "",
    website: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "images") data.append(key, formData[key]);
    });

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    try {
      await pharmacyInfo(data).unwrap();
      alert("تم الحفظ ✅");
      navigate("/");

    } catch {
      alert("خطأ ❌");
    }
  };

  if (section === "top") {
    return (
      <div className="data-pharmacy-page-wrapper">
      
          <p className="sub-title">
        لقد تم تأكيد حسابك بنجاح
        <br/>
             
             قم بتعبئة المعلومات التالية عن صيدليتك
             لإكمال ملف صيدليتك الخاصة
          </p>
       
      </div>
    );
  }

  if (section === "bottom")
    return (
      <Form className="pharmacy-form " onSubmit={handleSubmit} >
        <Row className="form-sections-row">

          {/* RIGHT */}
          <Col lg={6}>
            <div className="form-box-container">

              <div className="input-field-group">
                <label>الاسم <span className="star">*</span></label>
                <input name="name" className="pharmacy-input-field" onChange={handleChange} />
              </div>

              <div className="input-field-group">
                <label>رقم الهاتف <span className="star">*</span></label>
                <input name="phone" className="pharmacy-input-field" onChange={handleChange} />
              </div>

              <div className="input-field-group">
                <label>العنوان <span className="star">*</span></label>
                <input name="address" className="pharmacy-input-field" onChange={handleChange} />
              </div>

              <div className="input-field-group">
                <label>الموقع <span className="star">*</span></label>
                <input name="location" className="pharmacy-input-field" onChange={handleChange} />
              </div>

              <div className="input-field-group">
                <label>أيام الدوام <span className="star">*</span></label>
                <input name="workingDays" className="pharmacy-input-field" onChange={handleChange} />
              </div>

              {/* ساعات الدوام */}
              <div className="working-hours-section">

<div className="working-hours-header-row">

  <label className="working-hours-main-label">
    ساعات الدوام <span className="star">*</span>
  </label>

  <div
    className={`working-hours-select-box ${showHours ? "open" : ""}`}
    onClick={() => setShowHours(!showHours)}
  >
    <div className="select-text-content">
      <div>من 00:00 إلى 00:00 صباحاً</div>
      <div>من 00:00 إلى 00:00 مساءً</div>
    </div>

    <span className={`down-arrow-icon ${showHours ? "rotated" : ""}`}>
      ▼
    </span>
  </div>

</div>

{/* 🔥 الكولابس */}
<div className={`working-hours-collapsible ${showHours ? "show" : ""}`}>

  <div className="working-hours-inputs-grid">

    <div className="hour-row">
      <input type="time" name="morningOpen" className="hour-input-field" />
      <span className="hour-label">الافتتاح صباحاً</span>
    </div>

    <div className="hour-row">
      <input type="time" name="morningClose" className="hour-input-field" />
      <span className="hour-label">الإغلاق صباحاً</span>
    </div>

    <div className="hour-row">
      <input type="time" name="eveningOpen" className="hour-input-field" />
      <span className="hour-label">الافتتاح مساءً</span>
    </div>

    <div className="hour-row">
      <input type="time" name="eveningClose" className="hour-input-field" />
      <span className="hour-label">الإغلاق مساءً</span>
    </div>

  </div>

</div>

</div>

            </div>
          </Col>

          {/* LEFT */}
          <Col lg={6}>
            <div className="form-box-container">

              <div className="tabs-header-nav">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    className={`tab-nav-item ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div className="tab-body-content">

                {activeTab === "الوصف" && (
                  <div className="textarea-wrapper">
                    <textarea
                      name="description"
                      className="pharmacy-textarea"
                      onChange={handleChange}
                    />
                  </div>
                )}

                {activeTab === "الصور *" && (
                  <div className="upload-images-wrapper">
                    <div className="upload-box">
                      <input type="file" multiple hidden id="images" onChange={handleImageChange} />
                      <label htmlFor="images" className="upload-label">
                        <img src={uploadIcon} className="upload-icon-img" />
                        <p>رفع الصور</p>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "روابط" && (
                  <div className="social-links-wrapper">

                    <div className="social-link-item">
                      <img src={facebookIcon} className="social-icon-img" />
                      <input name="facebook" className="social-input" onChange={handleChange} />
                    </div>

                    <div className="social-link-item">
                      <img src={instagramIcon} className="social-icon-img" />
                      <input name="instagram" className="social-input" onChange={handleChange} />
                    </div>

                    <div className="social-link-item">
                      <img src={twitterIcon} className="social-icon-img" />
                      <input name="twitter" className="social-input" onChange={handleChange} />
                    </div>

                    <div className="social-link-item">
                      <img src={chromeIcon} className="social-icon-img" />
                      <input name="website" className="social-input" onChange={handleChange} />
                    </div>

                  </div>
                )}

              </div>
            </div>
          </Col>
        </Row>

        <div className="form-footer-action">
          <Button className="pharmacy-save-btn" type="submit" disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ البيانات"}
          </Button>
        </div>
      </Form>
    );

  return null;
};

export default DataPharmacy;