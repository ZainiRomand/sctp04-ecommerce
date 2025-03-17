import { useJwt } from "./UserStore";

export default function UserLogout() {
    const { clearJwt } = useJwt();

    const handleLogout = () => {
            clearJwt();
        };
    return (
        <div className="container mt-5">
            <h2>Logout</h2>
            <h2>You have successfully logout from E-Shop</h2>
            <button type="submit" className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    )
}