import { portTypes } from '@/utils/consts';
import { useMemo } from 'react';
import Label from '../../common/Label';
import PortWithTooltip from '../../common/PortWithTooltip';
import EditableLabel from '@/components/common/EditableLabel';
import { useReactFlow } from 'reactflow';

const CustomNode = ({ data, children }) => {
    const {setNodes} = useReactFlow();
    const rightPorts = useMemo(() => (data.ports || []).filter(p => p.type === portTypes.source), [data.ports]);
    const leftPorts = useMemo(() => (data.ports || []).filter(p => p.type === portTypes.target), [data.ports]);
    const handleSubmit = (portId, label) => {
        setNodes(prev => 
            prev.map(node => {
                const hasPort = node.data.ports.some(port => port.id === portId);
                if (hasPort) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ports: node.data.ports.map(port => 
                                port.id === portId ? { ...port, label } : port
                            )
                        }
                    };
                }
                return node;
            })
        );
    };
    return (
        <div className='custom-node relative white-bg rounded border border-white'>
            {children || (
                <div className='p-2 text-black'>
                    <Label data={data} />
                </div>
            )}
            <div className='realative text-xs flex flex-col justify-evenly -left-1 top-0 h-full'>
                <p className='bg-gray-400 flex w-full justify-center'>Targets:</p>
                {leftPorts.map(({type, id, label = ''}) => (
                    <div className='relative' key={id}>
                        <EditableLabel initialLabel={label} id={id} onSubmit={handleSubmit}/>
                        <div className='absolute top-1/2 -translate-y-1/2 -left-1'>
                            <PortWithTooltip
                                type={type}
                                label={label}
                                key={id}
                                id={id}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='realative text-xs flex flex-col justify-evenly -right-0 top-0 h-full'>
                <p className='bg-gray-400 flex w-full justify-center'>Sources:</p>
                {rightPorts.map(({type, id, label = ''}) => (
                    <div className='relative' key={id}>
                        <EditableLabel initialLabel={label} id={id} onSubmit={handleSubmit}/>
                        <div className='absolute top-1/2 -translate-y-1/2 -right-1'>
                            <PortWithTooltip
                                type={type}
                                label={label}
                                key={id}
                                id={id}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomNode;