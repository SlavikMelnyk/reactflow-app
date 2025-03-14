import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"

const CheckboxLabel = ({label, value, onChange}) =>{ 
    return (
    <div className='text-lg flex items-center justify-between px-2'>
        <span>{label}</span>
        <div className='select-none cursor-pointer'>
            {value ? (<ImCheckboxChecked className='w-5 h-5' onClick={onChange}/>) : (
                <ImCheckboxUnchecked onClick={onChange}/>
            )}
        </div>
    </div>
)};

export default CheckboxLabel;
