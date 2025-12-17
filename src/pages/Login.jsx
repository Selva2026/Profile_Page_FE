import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(user);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-96 rounded shadow space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input name="email" placeholder="Email" onChange={handleChange} className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="btn-primary">Login</button>

        <p className="text-sm text-center">
          New user?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
