export const sendPasswordResetSuccessEmail = async (email) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
 
  try {
    const response = await fetch(`${SERVER_URL}/api/send-password-reset-success-alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to send congratulatory email');
    }
  } catch (error: any) {
    console.error('Error sending congratulatory email:', error.message);
  }
};          