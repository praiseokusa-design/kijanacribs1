import React, { useState } from "react";
import API from "../services/api";

const Addhouse = () => {
  const [form, setForm] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      admin_id: user.id
    };

    try {
      const res = await API.post("/add_house", data);
      alert(res.data.message);
    } catch {
      alert("Error adding house");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Add House</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <button>Add House</button>
    </form>
  );
};

export default Addhouse;