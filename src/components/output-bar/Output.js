import { AppContext } from '@/contexts/AppContext';
import dynamic from 'next/dynamic';
import { useContext, useMemo } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
const ReactJson = dynamic(import('react-json-view'), { ssr: false });

const Output = ({visible, hide, nodes, edges}) => {
    const { isDarkTheme } = useContext(AppContext);
    
    const outputObject = useMemo(
        () => nodes.map(
            n => ({...n, edges: edges.filter(
                edge => edge.source === n.id || edge.target === n.id
            )}
        )
    ), [nodes, edges]);

    return (
        <aside className={`absolute transition-all duration-300 ease-in-out ${visible ? 'right-0' : '-right-80'} text-gray-700 z-10 h-full w-72 border-l ${isDarkTheme ? '!bg-black' : '!bg-white'}`}>
            <FaRegTimesCircle onClick={hide} className='cursor-pointer absolute top-4 right-4 h-8 w-8' />
            <p className='text-xl relative top-10 mb-4 font-bold'>Output:</p>
            <div className='h-5/6 relative top-10 overflow-scroll text-gray-600'>
                <ReactJson src={outputObject} name={false} theme='ashes' displayDataTypes={false} />
            </div>
        </aside>
    );
};

export default Output;