import React from "react";
import "./SuccessVerification.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import { CheckCircleFill, ArrowLeft } from "react-bootstrap-icons";

const SuccessVerification = () => {
  const { section } = useOutletContext();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dataPharmacy");
  };

  if (section === "bottom") return null;

  return (
    <div className="success-verification-page-wrapper" dir="rtl">
      <div className="success-verification-card">
        <div className="success-icon-section">
          <div className="icon-circle-bg">
            <CheckCircleFill className="success-check-icon" />
          </div>
          <div className="confetti-dots">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`dot dot-${i + 1}`}></span>
            ))}
          </div>
        </div>

        <div className="success-text-section">
          <h1 className="success-title-text">تم تأكيد حسابك بنجاح</h1>
          <p className="success-main-msg">شكراً لثقتك بنا وتعاملك معنا!</p>
          <div className="divider-line"></div>
          <p className="success-description-msg">
            انتقل إلى الموقع وابدأ تجربتك في إدارة صيدليتك واستفد من خدماتنا المتكاملة
          </p>
        </div>

        <div className="success-action-section">
          <button className="start-now-btn" onClick={handleStart}>
            <span>ابدأ تجربتك الآن</span>
            <ArrowLeft className="arrow-icon-rtl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessVerification;
