import { useCallback, useState } from 'react';
import Label from '../common/Label';
import CustomNode from './CustomNode';

const ColorPicker = ({data}) => {
    const [color, setColor] = useState(data.defaultValue);

    const handleChange = useCallback(e => {
        const newColor = e.target.value;
        setColor(newColor);
        data?.onChange(newColor);
    }, [data]);

    return (
        <div className='white-bg rounded-xl'>
            <CustomNode data={data}>
                <div className='text-xs p-2 text-black'>
                    <Label data={data} /> <strong>{color}</strong><span className='opacity-0'>{data.identifier}</span>
                </div>
                <input className='left-1/2 relative bg-white rounded-sm -translate-x-1/2' type='color' onChange={handleChange} defaultValue={data.defaultValue} />
            </CustomNode>
        </div>
    );
};

export default ColorPicker;