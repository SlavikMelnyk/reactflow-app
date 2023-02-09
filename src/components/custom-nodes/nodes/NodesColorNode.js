import { AppContext } from '@/contexts/AppContext';
import { useContext, useEffect } from 'react';
import ColorPicker from '../types/ColorPicker';

const NodesColorNode = ({data}) => {
    const { nodesBgColor, setNodesBgColor, } = useContext(AppContext);

    useEffect(() => {
        return () => setNodesBgColor(null);
    }, [setNodesBgColor]);

    return (
        <ColorPicker data={data} value={nodesBgColor} onChange={newColor => setNodesBgColor(newColor)} />
    );
};

export default NodesColorNode;