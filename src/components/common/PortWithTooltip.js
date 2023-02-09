import { Handle } from 'reactflow';

const PortWithTooltip = ({ type, label, id }) => (
    <div className='group relative'>
        <Handle
            type={type}
            id={id}
            className={`bg-slate-500`}
        />
        <span className='absolute whitespace-nowrap hidden px-1 group-hover:flex -top-6 right-0 translate-x-1/2 bg-gray-700 rounded-sm text-center text-white text-xs before:content-[""] before:absolute before:top-4  before:right-1/2 before:border-4 before:border-x-transparent before:border-b-transparent before:border-t-gray-700'>
            {`${type}: ${label}`}
        </span>
    </div>
);

export default PortWithTooltip;