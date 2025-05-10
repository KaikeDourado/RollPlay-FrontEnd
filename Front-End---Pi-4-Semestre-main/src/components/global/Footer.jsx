import { Link } from "react-router-dom";
import "./styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <Link to="/" className="footer-logo">Roll & Play</Link>
                <p>Copyright © 2025 Roll & Play Company, todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
