import { useJwt } from "./UserStore";
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';

export default function UserLogout() {
    const { clearJwt } = useJwt();
    const { showMessage } = useFlashMessage();
    const [, setLocation] = useLocation();

    const handleLogout = () => {
        clearJwt();
        setLocation("/login");
        showMessage("You have successfully logout from E-Shop","success");
    };
    return (
        <div className="container mt-5 mb-3">
            <h2>Logout</h2>

            <button type="submit" className="btn btn-primary" onClick={handleLogout}>Logout</button>

        </div>
    )
}