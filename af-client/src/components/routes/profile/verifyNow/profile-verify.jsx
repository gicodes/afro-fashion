import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../contexts/alert.context";
import { Button } from "react-bootstrap";

// Link (in profile) to verify seller account
export const VerifyNow = () => {
    const { addAutoCloseAlert, addOptionsAlert } = useAlert();
    const navigate = useNavigate();

    const handleYes = () => {
        navigate("/auth/accept-seller-terms")
    }
    const handleNo = () => {
        addAutoCloseAlert("warning", `Check your email for Afrofashion sign-in link and continue!`);
    };

    const handleVerifyOption = () => {
        addOptionsAlert(
            'warning', 'A verification link was sent to your email during sign-up. Do you want to retry the process again?',
            handleYes, handleNo
        );
    }

    return (
        <div className="container">
            <div className="mb-4 text-center" onClick={handleVerifyOption}>
                <Button className="btn-danger text-danger w-50">Verify your account now</Button>
            </div>
        </div>
    )
}