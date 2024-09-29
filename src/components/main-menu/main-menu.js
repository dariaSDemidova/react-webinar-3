import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function MainMenu() {
    const cn = bem('MainMenu');
    
    return (
        <nav className={cn()}>
        <Link to="/" className={cn('home')}>
            Главная
        </Link>
        </nav>
    );
}

export default memo(MainMenu);
