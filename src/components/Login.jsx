import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    useEffect(() => {
        document.title = 'Авторизация';
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({...prevData, [name]: value}));
        setErrors((prevErrors) => ({...prevErrors, [name]: ''}));
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(result.message);
                setTimeout(() => setSuccess(null), 3000);
                setFormData({email: '', password: ''});
                localStorage.setItem('token', result.token);
                navigate('/');
            } else {
                setErrors(result.errors || {});
            }
        } catch (err) {
            console.error('Ошибка', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-3">
            <h1 className="mb-3">Авторизация</h1>

            <div className="row">
                <div className="col-3">
                    <form onSubmit={handleForm}>
                        {['email', 'password'].map((field) => (
                            <div className="mb-3" key={field}>
                                <label htmlFor={field} className="form-label">
                                    {field === 'email' ? 'Эл. почта' : 'Пароль'}
                                </label>
                                <input
                                    type={field === 'password' ? 'password' : 'text'}
                                    name={field}
                                    id={field}
                                    className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                                    value={formData[field]}
                                    onChange={handleInput}
                                />
                                {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                            </div>
                        ))}

                        <button type="submit" className="btn btn-success mb-3"
                                disabled={loading}>{loading ? 'Загрузка...' : 'Войти'}</button>
                        {success && <div className="alert alert-success">{success}</div>}
                    </form>
                </div>
            </div>
        </section>
    )
}