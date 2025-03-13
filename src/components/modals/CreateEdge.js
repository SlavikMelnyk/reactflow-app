import { useCallback, useContext, useState } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"
const CreateEdgeModal = ({ params, setEdgeModal, onSave }) => {
    const { isDarkTheme } = useContext(AppContext);
    const [label, setLabel] = useState('');
    const [edgeType, setEdgeType] = useState('straight');
    const [animated, setAnimated] = useState(false);

    const handleSave = useCallback(() =>{
        onSave(params, label, edgeType, animated)
        setLabel('');
    }, [params, label, edgeType, animated]);

    if (!params) {
        return null;
    }
    return (
        <div className={`fixed text-gray-600 z-20 top-0 left-0 bottom-0 right-0 flex items-center justify-center`}>
            <div className='bg-gray-700 bg-opacity-70 w-full h-full z-0 absolute top-0 left-0 bottom-0 right-0' />
            <div className={`text-lg z-10 p-4 rounded-lg shadow-lg w-1/2 ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
                <h2 className='font-medium mb-4'> Add Edge</h2>
                <div className='flex gap-2 items-center'>
                    <input
                        className='p-2 text-base border bg-[#666666] text-[#eeeeee] border-gray-400 rounded-lg'
                        type='text'
                        value={label}
                        placeholder='Edge label:'
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <select className='rounded-lg bg-[#666666] px-1 text-[#eeeeee] w-32 h-8' value={edgeType} name='type' onChange={e => setEdgeType(e.target.value)}>
                        <option value='straight'>straight</option>
                        <option value='step'>step</option>
                        <option value='smoothstep'>smoothstep</option>
                        <option value='custom'>custom</option>
                    </select>
                </div>
                <div className='flex w-full'>
                    <div className='flex gap-1 items-center'>
                        <span>Animated: </span>
                        <div className='select-none cursor-pointer'>
                            {animated ? (<ImCheckboxChecked onClick={()=> setAnimated(prev=> !prev)}/>) : (
                                <ImCheckboxUnchecked onClick={()=> setAnimated(prev=> !prev)}/>
                            )}
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button
                            className='px-4 py-2 text-base bg-gray-600 text-white rounded-lg mr-2'
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className='px-4 py-2 text-base bg-gray-400 text-white rounded-lg'
                            onClick={()=>setEdgeModal(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEdgeModal;