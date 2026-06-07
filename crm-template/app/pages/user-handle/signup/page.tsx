"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";

const SignIn = () => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (
      !form.checkValidity() ||
      formData.password !== formData.confirmPassword
    ) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    console.log("Odesláno:", formData);
  };

  const errors: string[] = [];

  if (!formData.username.trim()) {
    errors.push("Username je povinný");
  }

  if (!formData.email.trim()) {
    errors.push("Email je povinný");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("Email není ve správném formátu");
  }

  if (!formData.password) {
    errors.push("Heslo je povinné");
  } else if (formData.password.length < 6) {
    errors.push("Heslo musí mít alespoň 6 znaků");
  }

  if (!formData.confirmPassword) {
    errors.push("Potvrzení hesla je povinné");
  } else if (formData.password !== formData.confirmPassword) {
    errors.push("Hesla se neshodují");
  }

  const isFormValid =
    formData.username.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword;

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
    } catch (error: any) {
       console.log(error.response?.data);
      console.log(error.response?.status);
    }
  };

  return (
    <section id="signup" className="form-section">
      <div className="w-100 d-flex align-items-center justify-content-center">
        <div className="border border-dark rounded p-3">
          <h2 className="text-center mb-4">Registration</h2>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingUsername" label="Username" className="mb-form">
              <Form.Control type="text" name="username" placeholder="John" value={formData.username} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-form">
              <Form.Control type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-form">
              <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPasswordConfirm" label="Confirm Password" className="mb-form">
              <Form.Control type="password" name="confirmPassword" placeholder="Password" value={formData.confirmPassword} onChange={handleChange} required />
            </FloatingLabel>

            {isFormValid ? (
              <Button variant="primary" type="button" className="w-50 mt-3 d-block mx-auto" onClick={handleRegister}>
                Sign Up
              </Button>
            ) : (
              <div className="mt-3 text-white bg-danger px-3 py-2 rounded">
                {errors.map((error, index) => (
                  <div className="py-2" key={index}>• {error}</div>
                ))}
              </div>
            )}
          </Form>

          <Link href="/login" className="d-block mt-4 text-center link">
            Already have an account? <strong>Sign In</strong>
          </Link>

          <Link href="/forgot-password" className="d-block mt-2 text-center link">
            <strong>Forgot Password?</strong>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;