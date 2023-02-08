import { useCallback, useContext, useState } from 'react';
import nextId from 'react-id-generator';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { isCustomNodeType, portTypes } from '@/utils/consts';
import { AppContext } from '@/contexts/AppContext';

const EditBlockModal = ({ element, onSave, onCancel }) => {
    const { isDarkTheme } = useContext(AppContext);
    const [label, setLabel] = useState(element.data.label);
    const [ports, setPorts] = useState(element.data.ports || []);

    const [newPortType, setNewPortType] = useState(portTypes.target);
    const [newPortLabel, setNewPortLabel] = useState('');

    const setPortProperty = (portId, property, value) => {
        setPorts(prev => prev.map(port => port.portId === portId ? { ...port, [property]: value } : port));
    }
    const handleAddPort = useCallback(() => {
        const newPort = { portId: nextId('port-'), type: newPortType, label: newPortLabel };
        setPorts(prev => prev.concat(newPort));
        setNewPortLabel('');
    }, [newPortType, newPortLabel]);

    const handleRemovePort = useCallback((portId) => {
        setPorts(prev => prev.filter(p => p.portId !== portId));
    }, []);

    const handleSave = useCallback(() => {
        onSave({ ...element, data: { ...element.data, label, ports, identifier: Math.ceil(Math.random()*9) }});
    }, [onSave, element, label, ports]);

    return (
        <div className={`fixed text-gray-600 z-20 top-0 left-0 bottom-0 right-0 flex items-center justify-center`}>
            <div className='bg-gray-700 bg-opacity-70 w-full h-full z-0 absolute top-0 left-0 bottom-0 right-0' />
            <div className={`text-lg z-10 p-4 rounded-lg shadow-lg w-1/2 ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
                <h2 className='font-medium mb-4'>Edit Block</h2>
                <input
                    className='mb-4 p-2 text-base border bg-[#666666] text-[#eeeeee] border-gray-400 rounded-lg'
                    type='text'
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
                {!isCustomNodeType(element.type) ? null : (
                <>
                    {ports.map(({portId, type, label}, i) => (
                        <div key={portId}>
                            <h3 className='mb-0 font-bold mt-3'>Port {i+1}:</h3>
                            <div className='flex h-8'>
                                <p className='w-16'>Type:</p>
                                <select className='rounded-lg bg-[#666666] px-1 text-[#eeeeee] w-32 h-8' value={type} name='type' onChange={e => setPortProperty(portId, 'type', e.target.value)}>
                                    <option value={portTypes.target}>{portTypes.target}</option>
                                    <option value={portTypes.source}>{portTypes.source}</option>
                                </select>
                                <input
                                    className='ml-4 p-2 flex-1 text-base border bg-[#666666] text-[#eeeeee] border-gray-400 rounded-lg'
                                    type='text'
                                    placeholder='Port label:'
                                    value={label}
                                    onChange={(e) => setPortProperty(portId, 'label', e.target.value)}
                                />
                                <button
                                    className='px-4 py-1 ml-4 text-base bg-gray-400 text-white rounded-lg'
                                    onClick={() => handleRemovePort(portId)}
                                >
                                    <FaMinusCircle />
                                </button>
                            </div>
                        </div>
                    ))}
                    <hr  className='mt-5' />
                    <h3 className='font-bold mt-2'>New Port:</h3>
                    <div key={'new-port-id'} className='flex mb-8 h-8'>
                        <p className='w-16'>Type:</p>
                        <select
                            className='rounded-lg bg-[#666666] px-1 text-[#eeeeee] w-32 h-8'
                            name='type'
                            value={newPortType}
                            onChange={e => setNewPortType(e.target.value)}
                        >
                            <option value={portTypes.target}>{portTypes.target}</option>
                            <option value={portTypes.source}>{portTypes.source}</option>
                        </select>
                        <input
                            className='ml-4 p-2 flex-1 text-base border bg-[#666666] text-[#eeeeee] border-gray-400 rounded-lg'
                            type='text'
                            placeholder='Port label:'
                            value={newPortLabel}
                            onChange={(e) => setNewPortLabel(e.target.value)}
                        />
                        <button
                            disabled={!newPortType}
                            className='disabled:bg-green-300 px-4 py-1 text-base bg-gray-600 text-white rounded-lg ml-4'
                            onClick={handleAddPort}
                        >
                            <FaPlusCircle />
                        </button>
                    </div>
                </>
                )}

                <div className='flex justify-end'>
                    <button
                        className='px-4 py-2 text-base bg-gray-600 text-white rounded-lg mr-2'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className='px-4 py-2 text-base bg-gray-400 text-white rounded-lg'
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBlockModal;
