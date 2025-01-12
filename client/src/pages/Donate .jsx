import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import '../css/Donate.css'; 
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";

export const Donate = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donorDetails, setDonorDetails] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorDetails({ ...donorDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Navigate to the PayPal processing page
    navigate("/paypal-donation", { state: { donorDetails, donationAmount } });
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
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
