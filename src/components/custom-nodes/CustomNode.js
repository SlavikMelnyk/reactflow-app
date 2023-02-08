import { portTypes } from '@/utils/consts';
import { useMemo } from 'react';
import Label from '../common/Label';
import PortWithTooltip from '../common/PortWithTooltip';

const CustomNode = ({ data, children }) => {
    const rightPorts = useMemo(() => (data.ports || []).filter(p => p.type === portTypes.source), [data.ports]);
    const leftPorts = useMemo(() => (data.ports || []).filter(p => p.type === portTypes.target), [data.ports]);

    return (
        <div className='custom-node relative white-bg rounded border border-white'>
            <div className='absolute flex flex-col justify-evenly -left-1 top-0 h-full'>
                {leftPorts.map(({type, id, label = ''}) => (
                    <PortWithTooltip
                        type={type}
                        label={label}
                        key={id}
                        id={id}
                    />
                ))}
            </div>
                {children || (
                    <div className='text-xs p-2 text-black'>
                        <Label data={data} />
                    </div>
                )}
            <div className='absolute flex flex-col justify-evenly -right-1 top-0 h-full'>
                {rightPorts.map(({type, id, label = ''}) => (
                    <PortWithTooltip
                        type={type}
                        label={label}
                        key={id}
                        id={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomNode;