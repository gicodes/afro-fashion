import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TbUserExclamation } from "react-icons/tb";
import { useAlert } from "../../../../contexts/alert.context";

// Link (in profile) to verify seller account
export const VerifyNow = () => {
    const { addAutoCloseAlert, addOptionsAlert } = useAlert();
    const navigate = useNavigate();

    const handleYes = () => {
        navigate("/auth/accept-seller-terms")
    }
    const handleNo = () => {
        addAutoCloseAlert("warning", `Check your email for Afrofashion verification link and continue!`);
    };

    const handleVerifyOption = () => {
        addOptionsAlert(
            'warning', 'A verification link was sent to your email during sign-up. Do you want to retry the process again?',
            handleYes, handleNo
        );
    }

    return (
        <div>
            <Button className="btn btn-warning" onClick={handleVerifyOption}>
                <TbUserExclamation fill="black"/>
            </Button>
            <span className="block mt-2">
                <b>Verify Now</b>
            </span>
        </div>
    )
}