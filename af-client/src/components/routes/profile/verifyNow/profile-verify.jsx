import { Link } from "react-router-dom"

// Link (in profile) to verify seller account
export const VerifyNow = () => {
    return (
        <div className="container">
            <div className="mb-4 text-center">
                <Link to="/auth/accept-seller-terms">
                    <span className="text-danger">Verify your account now</span>
                </Link>
            </div>
        </div>
    )
}