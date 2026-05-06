import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import check from 'check-types';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export const BookingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateDates = (id, field, value) => {
    setCart(
      produce((draft) => {
        const item = draft.items.find((i) => i.id === id);
        if (item) item[field] = value;
      })
    );
  };

  const removeBooking = (id) => {
    setCart(
      produce((draft) => {
        const index = draft.items.findIndex((item) => item.id === id);
        if (index !== -1) draft.items.splice(index, 1);
      })
    );
  };

  const proceedToCheckout = () => {
    if (cart.items.length === 0) return alert("Cart is empty");
    
    const missingDates = cart.items.some(item => !item.checkIn || !item.checkOut);
    if (missingDates) {
      alert("Please select check-in and check-out dates for all your cribs.");
      return;
    }

    const total = cart.items.reduce((acc, curr) => acc + curr.price, 0);
    navigate("/makepayment", { 
      state: { 
        product: { 
          product_name: "Cart Booking Total", 
          product_cost: total 
        } 
      } 
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 py-5">
        <div className="card shadow-lg border-0 p-4 rounded-4 bg-light">
          <h2 className="text-center text-primary mb-5 fw-bold">🏡 Your Booking Cart ({cart.items.length})</h2>
          
          {cart.items.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted fs-4">No cribs selected yet. Your future home is waiting!</p>
              <button className="btn btn-primary rounded-pill px-5 shadow-sm mt-3" onClick={() => navigate('/')}>
                Go to Listings
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-borderless align-middle bg-white rounded-3 shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th className="rounded-start ps-4">Crib Name</th>
                    <th>Price (KES)</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th className="rounded-end text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.id} className="border-bottom">
                      <td className="ps-4 fw-medium text-dark">{item.name}</td>
                      <td className="text-success fw-bold">{item.price.toLocaleString()}</td>
                      <td>
                        <input type="date" className="form-control border-0 shadow-sm" value={item.checkIn || ''} onChange={(e) => updateDates(item.id, 'checkIn', e.target.value)} />
                      </td>
                      <td>
                        <input type="date" className="form-control border-0 shadow-sm" value={item.checkOut || ''} onChange={(e) => updateDates(item.id, 'checkOut', e.target.value)} />
                      </td>
                      <td className="text-center">
                        <button onClick={() => removeBooking(item.id)} className="btn btn-outline-danger btn-sm border-0">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-end mt-5 pe-4">
                <h3 className="mb-4">Total: <span className="text-primary">KES {cart.items.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}</span></h3>
                <button onClick={proceedToCheckout} className="btn btn-primary btn-lg px-5 rounded-pill shadow fw-bold">Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};