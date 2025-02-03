import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { sendPasswordResetSuccessEmail } from "../api/emailing/sprse.ts";
import { sendVerificationSuccessEmail } from "../api/emailing/sevse.ts";
import Button from "../components/buttons/button.component.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/alert.context.tsx";
import { RedirectTemplate } from './template.tsx';
import React, { useState } from "react";

const auth = getAuth();

const AuthLanding: React.FC = ()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAutoCloseAlert } = useAlert();
  const [ email, setEmail ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  const queryParams = new URLSearchParams(location.search);

  const mode = queryParams.get("mode");
  const oobCode = queryParams.get("oobCode");

  if (!mode || !oobCode) return <RedirectTemplate title={"Keep being fashioniate :)"} />

  const handleResetPassword = async (newPassword) => {
    setIsLoading(true);
    try {
      const userEmail = await verifyPasswordResetCode(auth, oobCode);
      setEmail(userEmail);

      await confirmPasswordReset(auth, oobCode, newPassword);
      await sendPasswordResetSuccessEmail(email)

      addAutoCloseAlert("success", "Password reset successful! You can now log in with your new password.");
      navigate("/auth")
    } catch (error: any) {
      addAutoCloseAlert("danger", `Password reset failed: ${error.message}`);
    }
  };

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    console.log("before applyActionCode")

    try {
      await applyActionCode(auth, oobCode);
      console.log("after applyActionCode")
      await sendVerificationSuccessEmail(email);
      addAutoCloseAlert("success", "Email verification successful!");
      navigate("/dashboard");
    } catch (error: any) {
      addAutoCloseAlert("danger", `Email verification failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      { mode === "resetPassword" ? (
        <RedirectTemplate  title={"Reset your password"}>
          <div>
            {email && <p>Password reset link verified for <b>{email}</b>.</p>}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newPassword = (form.elements.namedItem("password") as HTMLInputElement).value;
                handleResetPassword(newPassword);
              }}
            >
              <input
                required
                type="password"
                name="password"
                aria-label="New password"
                placeholder="Enter new password"
                disabled={isLoading}
                className="fullWidth mb-1 p-1"
              />
              <Button buttonType="submit" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </RedirectTemplate>
      ):(
        <RedirectTemplate title={"Verify your email"}>
          <Button buttonType="button" onClick={handleVerifyEmail} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Finish Verification"}
          </Button>
        </RedirectTemplate>
      )}
    </div>
  );
}

export default AuthLanding;