import { getAuth, sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";

const auth = getAuth();

const actionCodeSettings = {
  url: 'https://afrofashion.site/auth/password-reset',
  handleCodeInApp: true,
  dynamicLinkDomain: 'afrofashion.page.link'
};

export const sendPasswordReset = (email) => {
  sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForPasswordReset', email);
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error.message);
    });
};

export const verifyResetCode = async (oobCode) => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    return email;
  } catch (error) {
    console.error("Error verifying reset code:", error.message);
    throw error;
  }
};
