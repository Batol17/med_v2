import React, { useState, useRef } from "react";
import "./EnsureLogin.css";
import { useOutletContext } from "react-router-dom";
import { useVerifyCodeMutation } from "../../../redux/features/auth/authApi"

const EnsureLogin = () => {
  const { section } = useOutletContext();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const [verifyCode, { isLoading, isError, error, isSuccess }] = useVerifyCodeMutation();
  const handleChange = (e, index) => {
    let value = e.target.value;
  
    // دعم اللصق (أكثر من رقم)
    if (value.length > 1) {
      const pasted = value.slice(0, 4).split("");
      const newOtp = [...otp];
  
      pasted.forEach((digit, i) => {
        if (!isNaN(digit)) {
          newOtp[i] = digit;
        }
      });
  
      setOtp(newOtp);
  
      const nextIndex = Math.min(pasted.length - 1, 3);
      inputRefs.current[nextIndex]?.focus();
      return;
    }
  
    if (isNaN(value)) return;
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // امسح القيمة الحالية بدون الرجوع
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // ارجع للخانة السابقة وامسحها
        inputRefs.current[index - 1]?.focus();
  
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
  
    const pasteData = e.clipboardData.getData("text").trim();
  
    if (!/^\d+$/.test(pasteData)) return;
  
    const pasted = pasteData.slice(0, 4).split("");
    const newOtp = [...otp];
  
    pasted.forEach((digit, i) => {
      newOtp[i] = digit;
    });
  
    setOtp(newOtp);
  
    // حط الفوكس على آخر خانة تم تعبئتها
    const lastIndex = pasted.length - 1;
    inputRefs.current[lastIndex]?.focus();
  };

  const handleConfirm = async () => {
    const code = otp.join("");
  
    // تحقق إذا في خانات فاضية
    if (otp.some((digit) => digit === "")) {
      alert("يرجى إدخال رمز التحقق كامل");
      return;
    }
  
    console.log("OTP Code:", code);
  
    try {
      const res = await verifyCode({ code }).unwrap();
      console.log("Verification success:", res);
      
      navigate("/data-pharmacy");
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };
  const handleFocus = (e) => {
    e.target.select();
  };
  const handleResend = () => {
    console.log("Resending code...");
  };

  if (section === "bottom") return null;

  return (
    <div className="ensure-login-simple-container">
      <h1 className="ensure-login-simple-title">تأكيد الحساب!</h1>

      <p className="ensure-login-simple-description">
        لقد قمنا بإرسال رمز تحقق مكون من 4 خانات إلى
      </p>
      <p className="ensure-login-simple-email">raghad@gmail.com</p>
      <p className="ensure-login-simple-instruction">ادخل الرمز في الخانات</p>

      <div className="otp-simple-inputs">
        {otp.map((digit, index) => (
       <input
       key={index}
       type="text"
       className="otp-simple-input"
       value={digit}
       onChange={(e) => handleChange(e, index)}
       onKeyDown={(e) => handleKeyDown(e, index)}
       onFocus={handleFocus}
       onPaste={handlePaste}   // 👈 مهم جداً
       ref={(el) => (inputRefs.current[index] = el)}
       maxLength={1}
     />
        ))}
      </div>

      <div className="resend-simple-link" onClick={handleResend}>
        إعادة إرسال الرمز
      </div>

      <button
  className="confirm-simple-button"
  onClick={handleConfirm}
  disabled={isLoading || otp.some((digit) => digit === "")}
>
  {isLoading ? "جاري التحقق..." : "تأكيد الحساب"}
</button>

      {isError && <p style={{ color: "red" }}>فشل التحقق</p>}
      {isSuccess && <p style={{ color: "green" }}>تم التحقق بنجاح ✅</p>}
    </div>
  );
};

export default EnsureLogin;