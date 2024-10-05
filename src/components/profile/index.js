import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import './style.css';

function Profile() {
    const cn = bem('Profile');
    const store = useStore();
    const select = useSelector(state => ({
        profile: state.profile.profile,
        error: state.profile.error,
        loading: state.profile.loading,
    }));

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            store.actions.profile.load(token);
        }
    }, [navigate, store]);

    if (select.error) return <p>{select.error}</p>;
    if (select.loading) return <p>Загрузка...</p>;
    if (!select.profile) return <p>Профиль не загружен.</p>; 

    return (
        <div className={cn()}>
            <h2 className={cn('title')}>Профиль</h2>
            <div className={cn('prop')}>
                <div className={cn('label')}>Имя:</div>
                <div className={cn('value')}>{select.profile.profile.name}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>Телефон:</div>
                <div className={cn('value')}>{select.profile.profile.phone}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>Email:</div>
                <div className={cn('value')}>{select.profile.email}</div>
            </div>
        </div>
    );
}

export default memo(Profile);
