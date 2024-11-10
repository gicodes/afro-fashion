import { getAuth, sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";

const auth = getAuth();

const actionCodeSettings = {
  url: 'https://afrofashion.site/auth/password-reset',
  handleCodeInApp: true,
  dynamicLinkDomain: 'afrofashion.page.link'
};

// Sends the password reset email and stores the email in localStorage for reference
export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('resetEmail', email);
      console.log("Password reset email sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error.message);
      throw error; 
    });
};

// Verifies the reset code and returns the associated email if valid
export const verifyResetCode = async (oobCode) => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    console.log("Reset code verified successfully.");
    return email;
  } catch (error) {
    console.error("Error verifying reset code:", error.message);

    if (error.code === 'auth/invalid-action-code') {
      console.warn("The reset code is invalid or expired.");
      throw new Error("The reset code is invalid or expired. Please request a new reset link.");
    }
    throw error; 
  }
};
