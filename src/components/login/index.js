import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

function Login() {
    const cn = bem('Login');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/v1/users/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.result.token);
                const redirectTo = location.state?.from || '/';
                navigate(redirectTo); 
            } else {
                setError(data.error.data.issues[0].message);
            }
        } catch (err) {
            console.error('Error details:', err);
            setError('Ошибка при подключении к серверу');
        }
    };

    return (
        <form className={cn()} onSubmit={handleLogin}>
            <h2 className={cn('title')}>Вход</h2>
            <div className={cn('input')}>
                <label htmlFor="login">Логин</label>
                <input
                    type="text"
                    name="login"
                    id="login"
                    className={cn('login')}
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    required
                />
            </div>
            <div className={cn('input')}>
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={cn('password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className={cn('error')}>{error}</p>}
            <button type="submit" className={cn('button')}>Войти</button>
        </form>
    );
}

export default memo(Login);