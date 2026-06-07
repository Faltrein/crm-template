"use client"
import Link from "next/link";
import { Button, FloatingLabel, Form } from "react-bootstrap";

const Login = () => {
  return (
    <section id="login" className="form-section"> 
      <div className="w-100 d-flex align-items-center justify-content-center">
        <div className="border border-dark rounded p-3">
          <h2 className="text-center mb-4">Login</h2>
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-form">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button variant="primary" type="button" className="w-50 mt-3 d-block mx-auto">
            Sign In
          </Button>
          <Link href="/signup" className="d-block mt-4 text-center link">
            Don't have an account? <strong>Sign Up</strong>
          </Link>

          <Link href="/forgot-password" className="d-block mt-2 text-center link">
            <strong>Forgot Password?</strong>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;