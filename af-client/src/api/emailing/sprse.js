export const sendPasswordResetSuccessEmail = async (email) => {
  try {
    const response = await fetch('/api/send-password-reset-success-alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send congratulatory email');
    }
    // console.log('Congratulatory email sent successfully!');
  } catch (error) {
    console.error('Error sending congratulatory email:', error.message);
  }
};          