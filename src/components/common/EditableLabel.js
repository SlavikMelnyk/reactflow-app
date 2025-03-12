import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';

const EditableLabel = ({ initialLabel, id, onSubmit }) => {
    const [label, setLabel] = useState(initialLabel);
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onSubmit(id, label);
    };

    const handleChange = (e) => {
        setLabel(e.target.value);
    };

    return isEditing ? (
        <input
            className='px-2 bg-white'
            type='text'
            value={label}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        <p className='px-2 bg-white' onDoubleClick={handleDoubleClick}>
            {label}
        </p>
    );
};

export default EditableLabel; 