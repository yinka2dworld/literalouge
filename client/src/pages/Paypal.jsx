import { useEffect } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation for accessing state

export const PayPalDonation = () => {
  const { state } = useLocation();
  const { donorDetails, donationAmount } = state || {};

  useEffect(() => {
    if (!donorDetails || !donationAmount) {
      // Redirect back to the main donation page if no state is found
      window.location.href = "/";
    }
  }, [donorDetails, donationAmount]);

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
              window.location.href = "/";  // Redirect back to main page after successful donation
            });
          },
          onError: () => {
            alert("There was an error with your payment. Please try again.");
          },
        })
        .render("#paypal-button");
    };

    document.body.appendChild(paypalScript);
  };

  useEffect(() => {
    if (donationAmount && donorDetails) {
      handlePayment();
    }
  }, [donationAmount, donorDetails]);

  return (
<div className="paypal-donation-container" style={{ 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
}}>
  <h1 style={{
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  }}>
    Processing Your Donation...
  </h1>
  <p style={{
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  }}>
    Thank you {donorDetails.name}, for trying to support Literalouge!
  </p>
  <div id="paypal-button" className="paypal-button" style={{
    width: '300px',
    height: '40px',
  }}></div>
</div>

  );
};

export default PayPalDonation;
