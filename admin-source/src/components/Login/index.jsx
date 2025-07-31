import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (res.ok) {
        setMessage(data.message || "Đăng nhập thành công!");
        localStorage.setItem("token", data.token);
        navigate("/home"); 
      } else {
        setMessage(data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      setMessage("Lỗi kết nối server! " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Đăng nhập Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </label>
        </div>
        <div>
          <label>
            Mật khẩu:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </label>
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p style={{ marginTop: 16, color: "red" }}>{message}</p>}
    </div>
  );
}

export default Login;