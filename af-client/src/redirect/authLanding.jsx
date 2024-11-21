import { applyActionCode } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { 
  verifyPasswordResetCode, 
  confirmPasswordReset, 
  getAuth,
} from "firebase/auth";

const auth = getAuth();

const AuthLanding = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const oobCode = queryParams.get("oobCode");

  // const handleNavigation = () => {
  //   if (mode === "resetPassword") {
  //     navigate("/auth/reset-password"); // Navigate to reset password page
  //   } else if (mode === "verifyEmail") {
  //     navigate("/auth/verify-email"); // Navigate to verify email page
  //   } else {
  //     navigate("/"); // Navigate to home or error page
  //   }
  // };

  const handleResetPassword = async (newPassword) => {
    try {
      // Verify the password reset code
      await verifyPasswordResetCode(auth, oobCode);

      // Confirm the new password
      await confirmPasswordReset(auth, oobCode, newPassword);
      console.log("Password has been reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      // Apply the email verification code
      await applyActionCode(auth, oobCode);
      console.log("Email verified successfully!");
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div>
      {mode === "resetPassword" && (
        <div>
          <h1>Reset Your Password</h1>
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
              placeholder="Enter new password"
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      )}
      {mode === "verifyEmail" && (
        <div>
          <h1>Verify Your Email</h1>
          <button onClick={handleVerifyEmail}>Verify Email</button>
        </div>
      )}
    </div>
  );
}

export default AuthLanding