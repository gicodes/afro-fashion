import { sendEmailVerification } from "firebase/auth";

export const sendVerification = async (email) => {
  if (email) {
    try {
      await sendEmailVerification(email, {
        url: 'https://afrofashion.site/auth.me',
        handleCodeInApp: true,
        dynamicLinkDomain: 'afrofashion.page.link',
      });
      console.log("Verification email sent!");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }
}