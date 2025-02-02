import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Главная</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Регистрация</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Авторизация</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Выход</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}