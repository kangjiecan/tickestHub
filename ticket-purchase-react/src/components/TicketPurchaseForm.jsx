// src/components/TicketPurchaseForm.jsx
import React, { useState } from 'react';

function TicketPurchaseForm() {
  const initialFormData = {
    concertId: 109, // Hidden, but part of the state
    name: '',
    email: '',
    phone: '',
    quantity: 2,
    creditCard: '',
    expiration: '',
    securityCode: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada', // Default based on location context
  };

  const [formData, setFormData] = useState(initialFormData);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' }); // type: 'success' or 'danger'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      // Handle number conversion for quantity specifically
      [name]: name === 'quantity' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' }); // Clear previous messages
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/TicketPurchase`;

    console.log('Sending data:', JSON.stringify(formData, null, 2)); // Debugging

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorDetails = `HTTP error! Status: ${response.status}`;
        try {
          // Try to parse specific error message from API if available
          const errorData = await response.json();
          errorDetails += ` - ${errorData.message || JSON.stringify(errorData)}`;
        } catch (parseError) {
          // Fallback if response body is not JSON or empty
          errorDetails += ` - ${response.statusText}`;
        }
        throw new Error(errorDetails);
      }

      // Attempt to parse success response (API might return data)
      try {
          const result = await response.json(); // Or response.text()
          console.log('API Success Response:', result);
      } catch (parseError) {
          console.log('API Success (No JSON Body)');
      }

      setStatusMessage({
        type: 'success',
        text: 'Purchase successful! Check your email for confirmation.',
      });
      setFormData(initialFormData); // Reset form on success

    } catch (error) {
      console.error('Purchase Error:', error);
      setStatusMessage({
        type: 'danger',
        text: `Purchase failed: ${error.message}. Please try again.`,
      });
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card p-4 p-md-5 shadow-sm">
        <header className="text-center mb-4 border-bottom pb-3">
          {/* You can replace this with an actual image if desired */}
          <img src="https://via.placeholder.com/150x50?text=TicketHub+Logo" alt="TicketHub Logo" className="mb-3 opacity-75" />
          <h1>Complete Your Ticket Purchase</h1>
          <div className="bg-light p-3 rounded border mt-3">
            <h2 className="h5 text-primary">The Lumineers - Brightside World Tour</h2>
            <p className="mb-1"><strong>Venue:</strong> Bell Centre, Montreal, QC</p>
            <p className="mb-0"><strong>Date:</strong> October 26, 2025</p>
          </div>
        </header>

        {/* Status Message Area */}
        {statusMessage.text && (
          <div className={`alert alert-${statusMessage.type} mt-3`} role="alert">
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Hidden field for concertId - still useful for standard form submission fallback */}
          <input type="hidden" name="concertId" value={formData.concertId} />

          {/* Contact Information */}
          <fieldset className="mb-4">
            <legend className="h5 mb-3 text-primary">Contact Information</legend>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name:</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address:</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number:</label>
                    <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., 555-123-4567"/>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="quantity" className="form-label">Number of Tickets:</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} min="1" max="10" required />
                </div>
            </div>
          </fieldset>

          {/* Payment Details */}
          <fieldset className="mb-4">
             <legend className="h5 mb-3 text-primary">Payment Details</legend>
             <div className="mb-3">
                <label htmlFor="creditCard" className="form-label">Credit Card Number:</label>
                <input type="text" className="form-control" id="creditCard" name="creditCard" value={formData.creditCard} onChange={handleChange} pattern="\d{15,16}" title="Enter 15 or 16 digit card number" required autoComplete="cc-number"/>
             </div>
             <div className="row">
                <div className="col-md-7 mb-3">
                    <label htmlFor="expiration" className="form-label">Expiration Date (MM/YY):</label>
                    <input type="text" className="form-control" id="expiration" name="expiration" value={formData.expiration} onChange={handleChange} placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/\d{2}" title="MM/YY format required" required autoComplete="cc-exp"/>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="securityCode" className="form-label">Security Code (CVV):</label>
                    <input type="text" className="form-control" id="securityCode" name="securityCode" value={formData.securityCode} onChange={handleChange} pattern="\d{3,4}" title="Enter 3 or 4 digit CVV" required autoComplete="cc-csc"/>
                </div>
             </div>
          </fieldset>

          {/* Billing Address */}
          <fieldset className="mb-4">
            <legend className="h5 mb-3 text-primary">Billing Address</legend>
             <div className="mb-3">
                <label htmlFor="address" className="form-label">Street Address:</label>
                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
             </div>
             <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">City:</label>
                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                 <div className="col-md-6 mb-3">
                    <label htmlFor="province" className="form-label">Province/State:</label>
                    {/* Could replace with a <select> for common provinces/states */}
                    <input type="text" className="form-control" id="province" name="province" value={formData.province} onChange={handleChange} required />
                </div>
             </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="postalCode" className="form-label">Postal/Zip Code:</label>
                    <input type="text" className="form-control" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>
                 <div className="col-md-6 mb-3">
                    <label htmlFor="country" className="form-label">Country:</label>
                    <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
             </div>
          </fieldset>


          <button type="submit" className="btn btn-success w-100 btn-lg" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Purchase Tickets'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketPurchaseForm;