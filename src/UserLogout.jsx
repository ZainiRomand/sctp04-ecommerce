import { useJwt } from "./UserStore";
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';

export default function UserLogout() {
    const { getJwt, clearJwt } = useJwt();
    const { showMessage } = useFlashMessage();
    const [, setLocation] = useLocation();

    const confirmLogout = () => {
        console.log('logout clicked');
        const token = getJwt();
        if (!token) {
            showMessage('You are not logged in.', 'danger');
            return;
        }

        const userConfirmed = confirm("Proceed to logout from E-Shop?");
        if (userConfirmed) {
            handleLogout();
        }
    }

    const handleLogout = () => {
        clearJwt();
        setLocation("/login");
        showMessage("You have successfully logout from E-Shop","success");
    }

    return (
        <div className="container mt-5 mb-3">
            <h2>Logout</h2>
            <button type="submit" className="btn btn-primary" onClick={confirmLogout}>Logout</button>
        </div>
    )
}