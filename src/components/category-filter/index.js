import { useState, useEffect } from 'react';
import Select from '../../components/select';

function CategoryFilter({ value, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
            const response = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Categories:', data);
            setCategories(formatCategories(data.result.items));
            } catch (err) {
            setError(err.message);
            } finally {
            setLoading(false);
            }
        };
        
        fetchCategories();
    }, []);
    
        const formatCategories = (categories = []) => {
        const formatted = [];
    
        const buildHierarchy = (parentId = null, level = 0) => {
            categories
            .filter(cat => (cat.parent?._id || null) === parentId)
            .forEach(cat => {
                formatted.push({ ...cat, title: `${'-'.repeat(level)} ${cat.title}` });
                buildHierarchy(cat._id, level + 1);
            });
        };
    
        buildHierarchy();
        return formatted;
        };
    
        if (loading) return <p>Загрузка категорий...</p>;
        if (error) return <p>Ошибка загрузки категорий: {error}</p>;
    
        return (
            <Select
                options={[{ value: '', title: 'Все' }, ...categories.map(cat => ({ value: cat._id, title: cat.title }))]}
                value={value}
                onChange={onChange}
            />
        );
    }
    
export default CategoryFilter;
    
