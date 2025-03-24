
import { useAuth } from './AuthContext';
import { useJwt } from "./UserStore";

export default function SuccessPayment() {
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
        <h2>Your payment has been processed</h2>
    </>
}