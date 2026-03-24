import React, { useEffect, useState } from "react";
import API from "../services/api";

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/get_houses") // you'll need to add this endpoint in Flask
      .then(res => setHouses(res.data.houses))
      .catch(err => console.log(err));
  }, []);

  const bookHouse = async (id) => {
    if (!user) return alert("Login first");

    try {
      await API.post("/book_house", {
        user_id: user.id,
        house_id: id
      });
      alert("Booked!");
    } catch {
      alert("Error booking");
    }
  };

  const pay = async (price) => {
  const phone = prompt("Enter phone (2547XXXXXXXX)");

  const formData = new FormData();
  formData.append("amount", price);
  formData.append("phone", phone);

  try {
    await API.post("/mpesa_payment", formData);
    alert("Check your phone to complete payment");
  } catch {
    alert("Payment failed");
  }
};

  return (
    <div>
      <h2>Houses</h2>

      {houses.map((h) => (
        <div key={h.id}>
          <h3>{h.title}</h3>
          <p>{h.description}</p>
          <p>{h.location}</p>
          <p>KES {h.price}</p>

          <button onClick={() => bookHouse(h.id)}>Book</button>
          {/* <button onClick={() => pay(p.product_cost)}>
  Pay with Mpesa
</button> */}
        </div>
      ))}
    </div>
  );
};

export default Houses;