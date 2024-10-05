import StoreModule from '../module';

/**
 * Модуль состояния для профиля пользователя
 */

class ProfileState extends StoreModule {
    initState() {
        return {
            profile: null,
            loading: false,
            error: null,
        };
    }

    async load(token) {
        this.setState({ loading: true, error: null });
        if (!token) {
            return this.setState({ loading: false, error: 'Нет токена' });
        }
        
        try {
            const response = await fetch('/api/v1/users/self?fields=*', {
                headers: { 'X-Token': token }
            });
            const json = await response.json();
            if (json.result) {
                this.setState({ profile: json.result, loading: false });
            } else {
                throw new Error('Не удалось загрузить профиль');
            }
        } catch (e) {
            this.setState({ loading: false, error: e.message });
        }
    }
}

export default ProfileState;

