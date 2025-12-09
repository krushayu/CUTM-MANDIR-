import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Donation.css';

const Donation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    purpose: 'brahmotsav',
    otherPurpose: '',
    donorName: '',
    donorEmail: '',
    transactionId: '',
    screenshot: null,
    screenshotPreview: null
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const purposeOptions = [
    { value: 'brahmotsav', label: 'Brahmotsavam', emoji: '🎊' },
    { value: 'other', label: 'Other', emoji: '📝' }
  ];

  // No authentication required for donation page

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.amount || parseFloat(formData.amount) < 1) {
      newErrors.amount = 'Please enter a valid amount (minimum ₹1)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.purpose) {
      newErrors.purpose = 'Please select a purpose for your donation';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.donorName?.trim()) {
      newErrors.donorName = 'Please enter your full name';
    }
    
    if (!formData.donorEmail?.trim()) {
      newErrors.donorEmail = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.donorEmail)) {
      newErrors.donorEmail = 'Please enter a valid email address';
    }
    
    if (!formData.transactionId?.trim()) {
      newErrors.transactionId = 'Please enter the transaction ID';
    } else if (formData.transactionId.length < 8) {
      newErrors.transactionId = 'Transaction ID must be at least 8 characters';
    }
    
    if (!formData.screenshot) {
      newErrors.screenshot = 'Please upload payment screenshot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, screenshot: 'Please upload a valid image file (JPEG, PNG, GIF)' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, screenshot: 'File size should be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          screenshot: file,
          screenshotPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.screenshot) {
        setErrors(prev => ({ ...prev, screenshot: '' }));
      }
    }
  };

  const removeScreenshot = () => {
    setFormData(prev => ({
      ...prev,
      screenshot: null,
      screenshotPreview: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNextStep = () => {
    let isValid = true;
    
    switch(step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }
    
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      return;
    }

    setLoading(true);
    try {
      // Create FormData with all required fields
      const submitData = new FormData();
      submitData.append('amount', formData.amount);
      const finalPurpose = formData.purpose === 'other' && formData.otherPurpose.trim() 
        ? formData.otherPurpose.trim() 
        : formData.purpose;
      submitData.append('purpose', finalPurpose);
      submitData.append('donorName', formData.donorName.trim());
      submitData.append('donorEmail', formData.donorEmail.trim());
      submitData.append('transactionId', formData.transactionId.trim());
      
      if (formData.screenshot) {
        submitData.append('screenshot', formData.screenshot);
      }
      
      // Add timestamp for security
      submitData.append('timestamp', new Date().toISOString());
      
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setStep(4);
      } else {
        const errorData = await response.json();
        alert(`Donation submission failed: ${errorData.message || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };



  return (
    <div className="donation-container">
      <div className="donation-header">
        <div className="header-content">
          <h1>ॐ Make a Donation</h1>
          <p>Contribute your sacred offering to Sri Venkataswami Temple</p>
          
          <div className="security-badge">
            🔒 Secured by SSL Encryption
          </div>
          
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              {step > 3 ? '✓' : '3'}
            </div>
            <div className={`progress-line ${step >= 4 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>✓</div>
          </div>
        </div>
      </div>

      <div className="donation-content">
        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="donation-step">
            <div className="step-header">
              <h2>💰 Select Donation Amount</h2>
              <p>Choose an amount that resonates with your devotion</p>
            </div>
            
            <div className="amount-section">
              <div className="suggested-amounts">
                <h3>Suggested Amounts</h3>
                <div className="amount-grid">
                  {[51, 101, 501, 1001, 2001, 5001].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      className={`amount-btn ${formData.amount == amount ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, amount }));
                        if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
                      }}
                    >
                      <span className="currency">₹</span>
                      <span className="amount">{amount}</span>
                    </button>
                  ))}
                </div>
                {errors.amount && <div className="error-message">⚠️ {errors.amount}</div>}
              </div>
              
              <div className="custom-amount">
                <h3>Other Amount</h3>
                <div className="amount-input">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) => {
                      const value = Math.max(1, parseInt(e.target.value) || '');
                      setFormData(prev => ({ ...prev, amount: value }));
                      if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
                    }}
                    min="1"
                    step="1"
                  />
                </div>
                <p className="hint">Minimum donation: ₹1</p>
              </div>
            </div>
            
            <div className="step-buttons">
              <button 
                className="next-btn"
                onClick={handleNextStep}
                disabled={!formData.amount || formData.amount < 1}
              >
                Continue to Purpose →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Purpose Selection */}
        {step === 2 && (
          <div className="donation-step">
            <div className="step-header">
              <h2>🎯 Select Donation Purpose</h2>
              <p>Choose where your contribution will make a difference</p>
            </div>
            
            <div className="purpose-section">
              <div className="purpose-grid">
                {purposeOptions.map(purpose => (
                  <button
                    key={purpose.value}
                    type="button"
                    className={`purpose-btn ${formData.purpose === purpose.value ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, purpose: purpose.value }));
                      if (errors.purpose) setErrors(prev => ({ ...prev, purpose: '' }));
                    }}
                  >
                    <span className="purpose-emoji">{purpose.emoji}</span>
                    <span className="purpose-label">{purpose.label}</span>
                  </button>
                ))}
              </div>
              
              {formData.purpose === 'other' && (
                <div className="other-purpose-input">
                  <label>Describe your donation purpose:</label>
                  <textarea
                    name="otherPurpose"
                    value={formData.otherPurpose}
                    onChange={handleInputChange}
                    placeholder="Please describe the purpose of your donation (optional)"
                    rows="3"
                  />
                </div>
              )}
              
              {errors.purpose && <div className="error-message">⚠️ {errors.purpose}</div>}
            </div>
            
            <div className="step-buttons">
              <button className="back-btn" onClick={handlePreviousStep}>
                ← Back to Amount
              </button>
              <button 
                className="next-btn"
                onClick={handleNextStep}
                disabled={!formData.purpose}
              >
                Continue to Payment →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Verification */}
        {step === 3 && (
          <div className="donation-step">
            <div className="step-header">
              <h2>📱 Complete Your Donation</h2>
              <p>Make payment and submit verification details</p>
            </div>
            
            <div className="payment-section">
              {/* QR Code Section */}
              <div className="qr-section">
                <div className="qr-card">
                  <div className="qr-header">
                    <h3>   
                       <img src="https://img.icons8.com/?size=100&id=pg7n7VLjNjSn&format=png&color=000000" alt="temple icon"style={{ width: "30px",height: "30px",objectFit: "contain"}} />  
                          Sri Venkataswami Temple
                        <img src="https://img.icons8.com/?size=100&id=pg7n7VLjNjSn&format=png&color=000000" alt="temple icon"style={{ width: "30px",height: "30px",objectFit: "contain"}} /> 
                    </h3>
                    <p>UPI Payment Gateway</p>
                  </div>
                  <div className="qr-code">
                    <img src="/QR.png" alt="Payment QR Code" onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPIID:temple@paytm&amount=' + formData.amount;
                    }} />
                  </div>
                  <div className="qr-details">
                    <div className="detail-item">
                      <span className="label">UPI ID:</span>
                      <span className="value">temple@paytm</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Amount:</span>
                      <span className="value amount-highlight">{formatAmount(formData.amount)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Purpose:</span>
                      <span className="value">
                        {formData.purpose === 'other' && formData.otherPurpose 
                          ? formData.otherPurpose 
                          : purposeOptions.find(p => p.value === formData.purpose)?.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="qr-instructions">
                    <h4>📱 How to Pay:</h4>
                    <ol>
                      <li>Open any UPI app on your phone</li>
                      <li>Scan the QR code above</li>
                      <li>Verify amount matches {formatAmount(formData.amount)}</li>
                      <li>Complete payment and save transaction details</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Verification Section */}
              <div className="verification-section">
                <div className="verification-card">
                  <h3> Payment Verification</h3>
                  <p>After payment, please provide these details for verification</p>
                  
                  <div className="form-grid">
                    <div className={`form-group ${errors.donorName ? 'error' : ''}`}>
                      <label>👤 Full Name</label>
                      <input
                        type="text"
                        name="donorName"
                        value={formData.donorName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.donorName && <div className="error-message">⚠️ {errors.donorName}</div>}
                    </div>

                    <div className={`form-group ${errors.donorEmail ? 'error' : ''}`}>
                      <label>📧 Email Address</label>
                      <input
                        type="email"
                        name="donorEmail"
                        value={formData.donorEmail}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                      {errors.donorEmail && <div className="error-message">⚠️ {errors.donorEmail}</div>}
                    </div>

                    <div className={`form-group full-width ${errors.transactionId ? 'error' : ''}`}>
                      <label>🔢 Transaction ID / UTR Number</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        placeholder="12-digit Transaction ID from your bank/UPI app"
                        required
                      />
                      {errors.transactionId && <div className="error-message">⚠️ {errors.transactionId}</div>}
                    </div>

                    <div className="form-group full-width">
                      <label>📸 Payment Screenshot</label>
                      <div className="file-upload">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          id="screenshot"
                          required
                        />
                        <label htmlFor="screenshot" className="file-label">
                          {formData.screenshot ? (
                            <>
                              <span>✅ {formData.screenshot.name}</span>
                              <small>({(formData.screenshot.size / 1024).toFixed(1)} KB)</small>
                            </>
                          ) : (
                            <span>📷 Upload Payment Screenshot</span>
                          )}
                        </label>
                      </div>
                      {errors.screenshot && <div className="error-message">⚠️ {errors.screenshot}</div>}
                      
                      {/* Screenshot Preview */}
                      {formData.screenshotPreview && (
                        <div className="screenshot-preview">
                          <div className="preview-container">
                            <img 
                              src={formData.screenshotPreview} 
                              alt="Payment Screenshot Preview" 
                              className="preview-image"
                            />
                            <button 
                              type="button" 
                              className="remove-preview"
                              onClick={removeScreenshot}
                            >
                              ✕
                            </button>
                          </div>
                          <p className="hint">Click ✕ to remove</p>
                        </div>
                      )}
                      
                      <div className="security-badge" style={{ marginTop: '1rem' }}>
                        🔐 All uploads are encrypted and secure
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="step-buttons">
              <button className="back-btn" onClick={handlePreviousStep}>
                ← Back to Purpose
              </button>
              <button 
                className="verify-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader"></span>
                    Processing...
                  </>
                ) : (
                  ' Submit'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="donation-step success">
            <div className="success-content">
              <div className="success-icon">🎉</div>
              <h2>Donation Submitted Successfully!</h2>
              
              <div className="success-details">
                <p>🙏 Your donation has been submitted for verification</p>
                <p>ॐ May the divine blessings be with you always</p>
              </div>
              
              <div className="donation-summary">
                <h3>Donation Summary</h3>
                <div className="summary-item">
                  <span>Amount:</span>
                  <span>{formatAmount(formData.amount)}</span>
                </div>
                <div className="summary-item">
                  <span>Purpose:</span>
                  <span>
                    {formData.purpose === 'other' && formData.otherPurpose 
                      ? formData.otherPurpose 
                      : purposeOptions.find(p => p.value === formData.purpose)?.label}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Transaction ID:</span>
                  <span>{formData.transactionId}</span>
                </div>
                <div className="summary-item">
                  <span>Status:</span>
                  <span className="amount-highlight">Pending Verification</span>
                </div>
              </div>
              
              <div className="success-buttons">
                <button 
                  className="primary-btn" 
                  onClick={() => navigate('/profile')}
                >
                  📋 View Donation History
                </button>
                <button 
                  className="secondary-btn"
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      amount: '',
                      purpose: 'brahmotsav',
                      otherPurpose: '',
                      donorName: '',
                      donorEmail: '',
                      transactionId: '',
                      screenshot: null,
                      screenshotPreview: null
                    });
                    setErrors({});
                  }}
                >
                  🔄 Make Another Donation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;