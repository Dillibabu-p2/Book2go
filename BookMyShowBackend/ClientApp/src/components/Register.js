import React, { useState } from "react";

function Register({ onRegisterSuccess, onLoginClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    fetch("/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
        if (data === "Registration Successful!") {
          onRegisterSuccess();
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
      <p>
        Already have an account?{" "}
        <button
          onClick={onLoginClick}
          style={{
            border: "none",
            background: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Login here
        </button>
      </p>
    </div>
  );
}
//comment
export default Register;
