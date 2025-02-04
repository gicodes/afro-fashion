export const sendPasswordResetSuccessEmail = async (email) => {
  // console.log('Sending congratulatory email to:', email);
  try {
    const response = await fetch('/api/send-password-reset-success-alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    // console.log('response:', response);
    if (!response.ok) {
      throw new Error('Failed to send congratulatory email');
    }
  } catch (error: any) {
    console.error('Error sending congratulatory email:', error.message);
  }
};          