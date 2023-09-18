import { useNavigate } from "react-router-dom";
import styles from "./components.module.css";
const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <header className={styles.header}>
            <button onClick={handleLogout} className={styles.logoutButton}>
                Log out
            </button>
        </header>
    );
}

export default Header;
