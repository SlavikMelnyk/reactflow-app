import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => (
    <div className='relative rounded-md shadow-sm border-2 border-gray-600'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FaSearch className='h-5 w-5 text-gray-500' />
        </div>
        <input
            className='form-input py-3 text-base pl-10 block w-full rounded-md transition duration-150 ease-in-out bg-gray rounded-md'
            placeholder='Search for blocks'
            onChange={e => onSearch(e.target.value)}
        />
    </div>
);

export default SearchBar;
