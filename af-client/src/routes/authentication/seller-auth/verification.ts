import { 
  getAuth, 
  sendSignInLinkToEmail,
  // sendEmailVerification,
} from "firebase/auth";

const auth = getAuth();

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://afrofashion.site/auth.me', // matches verify-email link used inline actionCodeSettings
  // This must be true.
  handleCodeInApp: true,
  dynamicLinkDomain: 'afrofashion.page.link' // allowed on Firebase Console
};

export const sendVerification = async (email) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user
    // Save the email locally so you don't need to ask the user for it again if they open the link on the same device...
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.error(errorMessage);
  });
};
