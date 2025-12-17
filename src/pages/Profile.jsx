import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"));
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const res = await updateProfile(user);
    setUser(res.data);

    setMsg("Profile updated");
    navigate("/login");

  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 w-96 rounded shadow space-y-3">
        <h2 className="text-xl font-bold text-center">Profile</h2>

        <input name="name" value={user.name || ""} onChange={handleChange} className="input" />
        <input value={user.email || ""} disabled className="input bg-gray-100" />
        <input name="age" value={user.age || ""} onChange={handleChange} className="input" />
        <input name="dob" type="date" value={user.dob?.slice(0,10) || ""} onChange={handleChange} className="input" />
        <input name="contact" value={user.contact || ""} onChange={handleChange} className="input" />

        {msg && <p className="text-green-600 text-sm">{msg}</p>}

        <button onClick={handleUpdate} className="btn-primary">Update</button>
        <button onClick={logout} className="btn-danger">Logout</button>
      </div>
    </div>
  );
}
