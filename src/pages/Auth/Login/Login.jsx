import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import Lock from "../../../assets/icons/lock.svg";
import Email from "../../../assets/icons/email.svg";
import "./login.css";
import Cookies from "universal-cookie";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const { section } = useOutletContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await login(formData).unwrap();
  
      // تخزين التوكن
      cookies.set("token", res.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // أسبوع
        // secure: true,
        sameSite: "strict",
      });
  
      navigate("/ensure-login");
  
    } catch (err) {
      console.error(err);
    }
  };
  
  if (section === "bottom") return null;
  return (
    <div className="login-page mx-5 p-0">
      <Row className="g-0 h-100">

        {/* RIGHT SIDE */}
        <Col md={6} className="login-blue-side">
          <div className="blue-content text-center mx-auto" style={{ paddingLeft: "80px" }}>
            <h1 >أهلاً بك !</h1>
            <p>سريع، آمن وموثوق به</p>
          </div>
        </Col>

        {/* LEFT SIDE */}
        <Col md={6} className="login-form-side my-2">
          <div className="login-box">

            <h2 className="title">دخول</h2>

            <Form  style={{ width: '70%' }} onSubmit={handleSubmit}>

              {/* EMAIL */}
              <Form.Group className="input-wrapper">
                <div className="input-container">

                  <img src={Email} alt="email" className="icon" />

                  <Form.Control
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <span className="floating-text">
                    البريد الإلكتروني <span className="required-star">*</span>
                  </span>

                </div>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="input-wrapper">
                <div className="input-container">

                  <img src={Lock} alt="lock" className="icon" />

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    required
                  />

                  <span className="floating-text">
                    كلمة المرور <span className="required-star">*</span>
                  </span>

                </div>
              </Form.Group>

            </Form>

            <div className="text-center mt-4 w-100">
              <Button
                type="submit"
                className="login-btn"
                disabled={isLoading}
                onClick={(e)=>{handleSubmit(e)}}
              >
                {isLoading ? <Spinner size="sm" /> : "تسجيل الدخول"}
              </Button>
            </div>

          </div>
        </Col>

      </Row>
    </div>
  );
};

export default Login;