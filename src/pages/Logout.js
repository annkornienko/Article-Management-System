import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    localStorage.removeItem("user")

    setTimeout(() => {
        navigate("/login")
    }, 500)
}

export default Logout