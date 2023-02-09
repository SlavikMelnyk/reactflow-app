const Label = ({ data }) => (
    <>
        <span className='opacity-0'>{data.identifier}</span>
            {data.label}
        <span className='opacity-0'>{data.identifier}</span>
    </>
);

export default Label;
