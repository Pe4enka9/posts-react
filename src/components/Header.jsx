import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'get',
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
            });

            if (response.ok) {
                localStorage.removeItem('token');
                setToken(null);
            }
        } catch (err) {
            console.error('Ошибка', err);
        } finally {
            setLoading(false);
        }
    };

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
                                <Link to="/register" className={`nav-link ${token ? 'd-none' : ''}`}>Регистрация</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className={`nav-link ${token ? 'd-none' : ''}`}>Авторизация</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className={`nav-link ${!token ? 'd-none' : ''}`}
                                      onClick={handleLogout}
                                      aria-disabled={loading}>{loading ? 'Выходим...' : 'Выйти'}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}