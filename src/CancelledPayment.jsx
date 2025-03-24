import { useAuth } from './AuthContext';
import { useJwt } from "./UserStore";

export default function CancelledPayment() {
    const { getJwt } = useJwt();
    const { isLoggedIn, login, logout } = useAuth();

    function checkToken() {
        const token = getJwt();
        if (token) {
            login();
        }
    }

    checkToken();

    return <>
        <h2>Your payment has not been processed. 
            Please try again or contact admin
        </h2>
    </>
}