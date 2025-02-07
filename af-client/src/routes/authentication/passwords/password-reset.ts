import { getAuth, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

const auth = getAuth();

const actionCodeSettings = {
  url: 'https://afrofashion.site/auth.me',
  handleCodeInApp: true,
  dynamicLinkDomain: 'afrofashion.page.link'
};

export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('resetEmail', email);
      // console.log("Password reset email sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error.message);
      throw error; 
    });
};

export const validateResetCode = async (oobCode) => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    // console.log("Reset code is valid for:", email);
    return email; 
  } catch (error) {
    console.error("Invalid or expired code:", error);
    throw error; 
  }
};

export const resetPassword = async (auth, oobCode, newPassword) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    console.log("Password has been reset successfully!");
    return true; // Redirect the user or show a success message
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error; // Handle errors, e.g., show an error message to the user
  }
};