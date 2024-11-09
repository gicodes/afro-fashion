import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { sendPasswordReset } from "../routes/authentication/passwords/password-reset";
import { sendPasswordResetSuccessEmail } from "../api/emailing/sprse";
import { useAlert } from "../contexts/alert.context";
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';
import { useEffect, useState } from 'react';

const PasswordReset = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { addAutoCloseAlert } = useAlert();
  const [ email, setEmail ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ isVerified, setIsVerified ] = useState(false);

  useEffect(() => {
    const handlePasswordReset = async () => {
      const actionCode = new URLSearchParams(window.location.search).get('oobCode');

      if (!actionCode) {
        console.error("No action code in URL.");
        addAutoCloseAlert('danger', "Invalid password reset link.");
        return;
      }

      try {
        // verify the reset code
        const email = await verifyPasswordResetCode(auth, actionCode);
        setEmail(email);  
        setIsVerified(true);  // show password input
      } catch (error) {
        console.error("Error verifying code:", error.message);
        if (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code') {
          addAutoCloseAlert('warning', "Your reset link has expired. A new link will be sent to your email.");
          const email = window.prompt("Please provide your email for a new password reset link:");
          if (email) await sendPasswordReset(email);
        } else {
          addAutoCloseAlert('danger', "Failed to verify reset link. Please try again.");
        }
      }
    };

    handlePasswordReset();
  }, [auth, addAutoCloseAlert]);

  const handlePasswordChange = async () => {
    const actionCode = new URLSearchParams(window.location.search).get('oobCode');

    if (newPassword.length < 6) {
      addAutoCloseAlert('warning', "Password must be at least 6 characters long.");
      return;
    }

    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      await sendPasswordResetSuccessEmail(email);

      addAutoCloseAlert('success', "Password reset successful! Redirecting...");
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error("Error confirming password reset:", error.message);
      addAutoCloseAlert('error', "Failed to reset password. Please try again.");
    }
  };

  return (
    <RedirectTemplate title="Reset Your Password">
      {isVerified ? (
        <div>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </label>
          <button onClick={handlePasswordChange}>Reset Password</button>
        </div>
      ) : (
        <p>Verifying reset link...</p>
      )}
    </RedirectTemplate>
  );
};

export default PasswordReset;
