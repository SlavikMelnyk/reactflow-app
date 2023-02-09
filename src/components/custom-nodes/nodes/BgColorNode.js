import { AppContext } from '@/contexts/AppContext';
import { INITIAL_CANVAS_BG_COLOR } from '@/utils/consts';
import { useContext, useEffect } from 'react';
import ColorPicker from '../types/ColorPicker';

const BgColorNode = ({data}) => {
    const { canvasBgColor, setCanvasBgColor } = useContext(AppContext);

    useEffect(() => {
        return () => setCanvasBgColor(INITIAL_CANVAS_BG_COLOR);
    }, [setCanvasBgColor]);

    return (
        <ColorPicker data={data} value={canvasBgColor} onChange={newColor => setCanvasBgColor(newColor)} />
    );
};

export default BgColorNode;