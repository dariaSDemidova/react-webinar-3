import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './style.css';

function Header() {
    const cn = bem('Header');
    const [username, setUsername] = useState('');
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/api/v1/users/self?fields=*', {
                    headers: { 'X-Token': token }
                });
                const data = await response.json();
                if (data.result && data.result.profile) {
                    setUsername(data.result.profile.name);
                }
            } catch (error) {
                console.error('Ошибка при получении профиля:', error);
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserProfile();
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        await fetch('/api/v1/users/sign', {
            method: 'DELETE',
            headers: { 'X-Token': token }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    };

    const handleLoginRedirect = () => {
        navigate('/login', { state: { from: location.pathname } });
    };

    return (
        <div className={cn()}>
            {isAuthenticated ? (
                <div>
                    <Link to="/profile" className={cn('username')}>{username}</Link>
                    <button onClick={handleLogout}>Выход</button>
                </div>
            ) : (
                <button onClick={handleLoginRedirect} className={cn('button')}>Вход</button>
            )}
        </div>
    );
}

export default memo(Header);