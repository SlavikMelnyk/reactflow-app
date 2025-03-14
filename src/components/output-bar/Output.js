import { AppContext } from '@/contexts/AppContext';
import dynamic from 'next/dynamic';
import { useCallback, useContext, useMemo, useState } from 'react';
import { FaPaste, FaRegTimesCircle } from 'react-icons/fa';
const ReactJson = dynamic(import('react-json-view'), { ssr: false });

const Output = ({visible, hide, nodes, edges}) => {
    const { isDarkTheme, setPastedOutputNodes } = useContext(AppContext);
    const [pastedOutput, setPastedOutput] = useState('');
    
    const outputObject = useMemo(
        () => nodes.map(
            n => ({...n, edges: edges.filter(
                edge => edge.source === n.id || edge.target === n.id
            )}
        )
    ), [nodes, edges]);

    const handleBuild = useCallback(() => {
        setPastedOutputNodes(JSON.parse(pastedOutput));
    }, [pastedOutput, setPastedOutputNodes])

    return (
        <aside className={`absolute transition-all duration-300 ease-in-out ${visible ? 'right-0' : '-right-80'} text-gray-700 z-10 h-full overflow-scroll w-72 border-l ${isDarkTheme ? '!bg-black' : '!bg-white'}`}>
            <FaRegTimesCircle onClick={hide} className='cursor-pointer absolute top-4 right-4 h-8 w-8' />
            <p className='text-xl relative top-4 mb-2 font-bold w-fit'>Output:</p>
            <div className='h-3/4 relative top-4 overflow-scroll text-gray-600'>
                <ReactJson src={outputObject} name={false} theme='ashes' displayDataTypes={false} />
            </div>
            <p className='text-xl relative top-8 font-bold'>Build from copy:</p>
            <div className='relative top-9 rounded-md shadow-sm border-2 border-gray-600'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaPaste className='h-5 w-5 text-gray-500' />
                </div>
                <input
                    className='form-input py-3 text-base pl-10 block w-full bg-gray rounded-md'
                    type='text'
                    value={pastedOutput}
                    onChange={e => setPastedOutput(e.target.value)}
                />
            </div>
            <button
                className='relative top-12 px-8 py-2 text-base bg-gray-600 text-white font-bold rounded-lg ml-2 mb-2 left-40'
                onClick={handleBuild}
            >
                Build
            </button>
        </aside>
    );
};

export default Output;
