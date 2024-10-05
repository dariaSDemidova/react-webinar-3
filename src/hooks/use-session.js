import { useEffect } from 'react';

function useSession() {
    const restoreSession = async () => {
        const token = localStorage.getItem('token');
        if (token) {
        try {
            const response = await fetch('/api/v1/users/self?fields=*', {
            headers: { 'X-Token': token },
            });
            const data = await response.json();
            if (data.result) {
                console.log('Сессия восстановлена:', data.result);
            } else {
                console.error('Не удалось восстановить сессию');
            }
        } catch (error) {
            console.error('Ошибка при восстановлении сессии:', error);
        }
        }
    };

    return { restoreSession };
}

export default useSession;