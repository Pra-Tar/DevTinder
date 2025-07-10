import React, { useState } from "react";

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Step 2: Initialize Razorpay Checkout
        const options = {
          key: "rzp_test_hKM4GwHeWK3w5f", // Replace with your Razorpay Key ID
          amount: data.amount, // Amount in paise
          currency: data.currency,
          name: "Your Business Name",
          description: "Payment for Order",
          order_id: data.id, // Order ID created from backend
          handler: function (response) {
            alert(
              `Payment Successful! Razorpay Payment ID: ${response.razorpay_payment_id}`
            );
          },
          prefill: {
            name: "John Doe",
            email: "johndoe@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#3399cc",
          },
        };

        // Step 3: Open Razorpay Checkout
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <button
        className="btn-secondary"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
