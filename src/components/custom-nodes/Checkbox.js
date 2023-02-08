import { useCallback, useState } from 'react';
import Label from '../common/Label';
import CustomNode from './CustomNode';

const Checkbox = ({data}) => {
    const [checked, setChecked] = useState(data.defaultValue);
    const handleChange = useCallback(e => {
        setChecked(prev => {
            data?.onChange(!prev);
            return !prev;
        });
    }, [data]);

    return (
        <div className='white-bg rounded-xl'>
            <CustomNode data={data}>
                <div className='text-xs p-2 text-black'>
                    <Label data={data} />
                </div>
                <input
                    className='form-check-input appearance-none h-4 w-4 border border-gray-500 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-600 focus:outline-none transition duration-100 left-1/2 relative bg-white rounded-sm -translate-x-1/2'
                    checked={checked}
                    type='checkbox'
                    onChange={handleChange}
                />
            </CustomNode>
        </div>
    );
};

export default Checkbox;