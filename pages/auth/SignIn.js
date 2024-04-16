import { Form, Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { instance } from "@/utils/Apiconfig";
import { toast } from "react-toastify";
import "./Signin.module.scss";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false
    });

    if (res.error) {
      toast.error("Username or Password is invalid.");
      setLoading(false);
    } else {
      toast.success("Login Successfully!");
      router.push('/secure')
      setLoading(false);
    }
  };

  return (<section className="d-flex align-items-center justify-center mt-5 w-50 m-auto">
    <div
      className="sign-in__wrapper container"
    >
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>

        <div className="h4 mb-2 text-center">Sign In</div>

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {!loading ? (<div className="w-50 m-auto">
          <Button className="w-full" variant="primary" type="submit">
            Log In
          </Button>
        </div>
        ) : (
          <div className="w-50 m-auto">
            <Button className="w-full" variant="primary" type="button">
              Logging in..
            </Button>
          </div>
        )}

      </Form>
    </div>
  </section>
  );
};

export default Login;
