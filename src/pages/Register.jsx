import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    contact: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-96 rounded shadow space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="input" />
        <input name="email" placeholder="Email" onChange={handleChange} className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
        <input name="age" placeholder="Age" onChange={handleChange} className="input" />
        <input name="dob" type="date" onChange={handleChange} className="input" />
        <input name="contact" placeholder="Contact" onChange={handleChange} className="input" />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="btn-primary">Register</button>

        <p className="text-sm text-center">
          Already have account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
