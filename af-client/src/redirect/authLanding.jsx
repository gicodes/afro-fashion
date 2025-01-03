import { sendPasswordResetSuccessEmail } from "../api/emailing/sprse";
import { sendVerificationSuccessEmail } from "../api/emailing/sevse";
import Button from "../components/buttons/button.component";
import { useAlert } from "../contexts/alert.context";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  getAuth,
  applyActionCode, 
  verifyPasswordResetCode, 
  confirmPasswordReset } from "firebase/auth";
import { RedirectTemplate } from "./template";
import { useState } from "react";

const auth = getAuth();

export default function AuthLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAutoCloseAlert } = useAlert();
  const [ email, setEmail ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const queryParams = new URLSearchParams(location.search);

  const mode = queryParams.get("mode");
  const oobCode = queryParams.get("oobCode");

  if (!mode || !oobCode) return <RedirectTemplate title={"AF Blank Template"} />

  const handleResetPassword = async (newPassword) => {
    setIsLoading(true);
    try {
      const userEmail = await verifyPasswordResetCode(auth, oobCode);
      setEmail(userEmail);

      await confirmPasswordReset(auth, oobCode, newPassword);
      await sendPasswordResetSuccessEmail(email)

      addAutoCloseAlert("success", "Password reset successful! You can now log in with your new password.");
      navigate("/auth")
    } catch (error) {
      console.error("Error resetting password:", error);
      addAutoCloseAlert("danger", `Password reset failed: ${error.message}`);
    }
  };

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      await applyActionCode(auth, oobCode);
      await sendVerificationSuccessEmail(email);

      addAutoCloseAlert("success", "Email verification successful! You can now use all features.");
      navigate("/dashboard")
    } catch (error) {
      console.error("Error verifying email:", error);
      addAutoCloseAlert("danger", `Email verification failed: ${error.message}`);
    }
  };

  return (
    <>
      { mode === "resetPassword" && (
        <RedirectTemplate  title={"Reset your password"}>
          <div>
            {email && <p>Password reset link verified for <strong>{email}</strong>.</p>}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newPassword = e.target.password.value;
                handleResetPassword(newPassword);
              }}
            >
              <input
                type="password"
                name="password"
                aria-label="New password"
                placeholder="Enter new password"
                required
                disabled={isLoading}
                className="fullWidth mb-1 p-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </RedirectTemplate>
      )}
      { mode === "verifyEmail" && (
        <RedirectTemplate title={"Verify your email"}>
          <Button onClick={handleVerifyEmail} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Finish Verification"}
          </Button>
        </RedirectTemplate>
      )}
    </>
  );
}
