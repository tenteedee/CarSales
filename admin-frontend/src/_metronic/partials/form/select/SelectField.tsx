import React from 'react';
import Select from 'react-select';

interface SelectFieldProps {
    options: { value: number; label: string }[];
    defaultValue?: { value: number; label: string };
    onChange: (value: any) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ options, defaultValue, onChange }) => {
    return (
        <Select
            options={options}
            defaultValue={defaultValue}
            isMulti={true}
            onChange={onChange}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
};

export default SelectField;
