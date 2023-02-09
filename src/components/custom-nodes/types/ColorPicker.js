import { INITIAL_CANVAS_BG_COLOR } from '@/utils/consts';
import { useEffect } from 'react';
import Label from '../../common/Label';
import CustomNode from './CustomNode';

const ColorPicker = ({data, value, onChange}) => (
    <div className='white-bg rounded-xl'>
        <CustomNode data={data}>
            <div className='text-xs p-2 text-black'>
                <Label data={data} /> <strong>{value}</strong>
            </div>
            <input className='left-1/2 relative bg-white rounded-sm -translate-x-1/2' type='color' onChange={e => onChange(e.target.value)} defaultValue={value} />
        </CustomNode>
    </div>
);

export default ColorPicker;