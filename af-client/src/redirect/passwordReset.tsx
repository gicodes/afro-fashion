import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { sendPasswordReset } from "../routes/authentication/passwords/password-reset.ts";
import { sendPasswordResetSuccessEmail } from "../api/emailing/sprse.ts";
import { useAlert } from "../contexts/alert.context.tsx";
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template.tsx';

const PasswordReset = ({ actionCode }) => {
  const { addAutoCloseAlert } = useAlert();
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const verifyCode = async () => {
      try {
        const email = await verifyPasswordResetCode(auth, actionCode);

        setEmail(email);
        setIsVerified(true); 
      } catch (error: any) {
        console.error("Error verifying reset code:", error.message);

        if (error.code === "auth/invalid-action-code" || error.code === "auth/expired-action-code") {
          addAutoCloseAlert("warning", "Your reset link has expired. A new link will be sent to your email.");
          
          const email = window.prompt("Please provide your email for a new password reset link:");
          if (email) await sendPasswordReset(email);
        } else {
          addAutoCloseAlert("danger", "Failed to verify reset link. Please try again.");
        }
      }
    };

    verifyCode();
  }, [actionCode, auth, addAutoCloseAlert]);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {

      addAutoCloseAlert("warning", "Passwords do not match. Please try again.");
      return;
    }

    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      await sendPasswordResetSuccessEmail(email);
      
      addAutoCloseAlert("success", "Password reset successfully! Redirecting to dashboard...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

    } catch (error: any) {
      console.error("Error confirming password reset:", error.message);
      addAutoCloseAlert("danger", "Failed to reset password. Please try again.");
    }
  };

  return (
    <RedirectTemplate title={"Reset your Password"}>
      {isVerified ? (
        <div>
          <p>Password reset link verified for {email}. Please enter your new password below:</p>
          
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      ) : (
        <p>Verifying your reset link...</p>
      )}
    </RedirectTemplate>
  );
};

export default PasswordReset;
