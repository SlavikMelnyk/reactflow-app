import { AppContext } from '@/contexts/AppContext';
import { useContext } from 'react';
import Checkbox from '../types/Checkbox';

const ThemeNode = ({data}) => {
    const { isDarkTheme, setIsDarkTheme } = useContext(AppContext);

    return (
        <Checkbox data={data} value={isDarkTheme} onChange={() => setIsDarkTheme(prev => !prev)} />
    );
};

export default ThemeNode;