import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {  useVerifyCodeMutation } from "../../../redux/features/auth/authApi.js";

const SignUp = () => {
  const navigate = useNavigate();

  const [signup, { isLoading }] = useVerifyCodeMutation();

  const [userData, setUserData] = useState({
    type: "user",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    license: "",
    location: {
      coordinates: [],
    },
  });

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // phone
  const handlePhoneChange = (value) => {
    setUserData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  // location
  const getLocation = () => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const coords = [
    //     position.coords.latitude,
    //     position.coords.longitude,
    //   ];

      setUserData((prev) => ({
        ...prev,
        location: {
          coordinates: [  30.0444,
            31.2357],
        },
      }));
    // });
  };

  // submit
  const handleRegister = async (e) => {
    e.preventDefault();
console.log(userData);

    try {
      const res = await signup(userData).unwrap();

      console.log("✅ Success:", res);

      // redirect بعد النجاح
      navigate("/login");

    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <Container>
      <Row
        className="pb-5 d-flex justify-content-center align-items-center mx-1"
        style={{ minHeight: "100vh", paddingTop: "150px" }}
      >
        <Col xs={12} md={10} lg={6}>
          <h3 className="text-center mb-4">إنشاء حساب</h3>

          <Form onSubmit={handleRegister}>
            {/* username */}
            <Form.Control
              className="mb-3"
              name="username"
              placeholder="اسم المستخدم"
              onChange={handleChange}
              required
            />

            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  name="firstName"
                  placeholder="الاسم الأول"
                  onChange={handleChange}
                  required
                />
              </Col>

              <Col md={6}>
                <Form.Control
                  name="lastName"
                  placeholder="الاسم الأخير"
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Form.Control
              className="mb-3"
              name="email"
              type="email"
              placeholder="الايميل"
              onChange={handleChange}
              required
            />

            <Form.Control
              className="mb-3"
              name="password"
              type="password"
              placeholder="كلمة السر"
              onChange={handleChange}
              required
            />

            <div className="mb-3">
              <PhoneInput
                international
                defaultCountry="SY"
                value={userData.phone}
                onChange={handlePhoneChange}
                className="form-control"
                required
              />
            </div>

            <Form.Control
              className="mb-3"
              name="address"
              placeholder="العنوان"
              onChange={handleChange}
              required
            />

            <Form.Control
              className="mb-3"
              name="license"
              placeholder="رقم الشهادة"
              onChange={handleChange}
              required
            />

            {/* location */}
            <Form.Control
              className="mb-2"
              type="text"
              readOnly
              value={
                userData.location.coordinates.length
                  ? userData.location.coordinates.join(", ")
                  : ""
              }
              placeholder="إحداثيات الموقع"
            />

            <div className="text-center mb-3">
              <Button variant="secondary" onClick={getLocation}>
                📍 تحديد الموقع
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-50"
              >
                {isLoading ? (
                  <Spinner size="sm" animation="border" />
                ) : (
                  "إنشاء حساب"
                )}
              </Button>
            </div>
          </Form>

          <p className="text-center mt-4">
            هل لديك حساب بالفعل ؟{" "}
            <Link to="/login" className="text-danger">
              تسجيل دخول
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;