// form-handler.js

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const data = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim(),
    };
  
    console.log("📤 Sending form data:", data); // DEBUG: Check what's being sent
  
    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      console.log("✅ Server response:", result); // DEBUG: Server response
  
      if (result.success) {
        alert('✅ Message sent successfully!');
        document.getElementById('contactForm').reset();
      } else {
        alert('❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('❌ Error connecting to the server.');
      console.error("🚨 Fetch error:", error);
    }
  });
  