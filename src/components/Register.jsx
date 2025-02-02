import {useEffect, useState} from "react";

export default function Register() {
    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({...prevData, [name]: value}));
        setErrors((prevErrors) => ({...prevErrors, [name]: ''}));
    }

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        setErrors({});

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(result.message);
                setTimeout(() => setSuccess(null), 3000);
                setFormData({email: '', first_name: '', last_name: '', password: ''});
            } else {
                setErrors(result.errors);
            }
        } catch (err) {
            console.error('Ошибка', err);
            setError('Ошибка');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="mt-5">
            <h1 className="mb-3">Регистрация</h1>

            <div className="row">
                <div className="col-3">
                    <form onSubmit={handleForm}>
                        {['email', 'first_name', 'last_name', 'password'].map((field) => (
                            <div className="mb-3" key={field}>
                                <label htmlFor={field} className="form-label">
                                    {field === 'email' ? 'Эл. почта' :
                                        field === 'first_name' ? 'Имя' :
                                            field === 'last_name' ? 'Фамилия' :
                                                'Пароль'}
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
                                disabled={loading}>{loading ? 'Загрузка...' : 'Зарегистрироваться'}</button>

                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                    </form>
                </div>
            </div>
        </section>
    )
}