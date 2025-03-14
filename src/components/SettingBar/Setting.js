import { AppContext } from '@/contexts/AppContext';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import {  FaRegTimesCircle } from 'react-icons/fa';
import CheckboxLabel from '../common/CheckboxLabel';

const Setting = ({visible, hide}) => {
    const { isDarkTheme, setIsDarkTheme,  snapToGrid, setSnapToGrid } = useContext(AppContext);

    return (
        <aside className={`absolute h-fit transition-all bottom-0 duration-300 ease-in-out 
            text-gray-700 z-10 overflow-scroll w-64 border-l
            ${visible ? 'left-0' : '-left-80'} 
            ${isDarkTheme ? '!bg-black' : '!bg-white'}`}
        >   
            <div className='w-full flex justify-between items-center px-1 mb-4'>
                <span className='text-xl  font-bold w-fit'>Setting:</span>
                <FaRegTimesCircle onClick={hide} className='cursor-pointer h-8 w-8' />
            </div>
            <CheckboxLabel label='Snap node to grid:' value={snapToGrid} onChange= {()=> setSnapToGrid(prev => !prev)}/>
            <CheckboxLabel label='Dark theme:' value={isDarkTheme} onChange= {()=> setIsDarkTheme(prev => !prev)}/>
        </aside>
    );
};

export default Setting;
