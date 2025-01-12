import { useState } from "react";
import '../css/Donate.css'; 
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";

export const Donate = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donorDetails, setDonorDetails] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails({ ...donorDetails, [name]: value });
  };

  const handlePayment = () => {
    const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    if (!PAYPAL_CLIENT_ID) {
      alert("PayPal Client ID is missing.");
      return;
    }

    const paypalScript = document.createElement("script");
    paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    paypalScript.async = true;

    paypalScript.onload = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: donationAmount,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(() => {
              alert("Thank you for your donation!");
              setIsSubmitting(false); // Reset form state
            });
          },
        })
        .render("#paypal-button");
    };

    document.body.appendChild(paypalScript);
    setIsSubmitting(true); // Set submitting state to true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="donate-container">
      <Navbar />
      <div className="donate-content">
        <h1 className="donate-title">Donate to Literalouge</h1>
        <p className="donate-description">
          Your support makes a difference. Thank you!
        </p>
        <form onSubmit={handleSubmit} className="donate-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={donorDetails.name}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={donorDetails.email}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Donation Amount (USD)
            </label>
            <input
              type="number"
              id="amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
              className="form-input"
              placeholder="Amount"
              min="1"
            />
          </div>

          <button
            type="submit"
            className="donate-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Donate"}
          </button>
        </form>

        <div id="paypal-button" className="paypal-button"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
