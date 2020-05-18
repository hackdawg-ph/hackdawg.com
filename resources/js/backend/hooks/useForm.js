import { useState } from 'react';

export default function UseForm(defaultValues) {
    const [values, setValues] = useState(defaultValues);

    function updateValue(key, value) {
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    function handleChange(e) {
        e.persist();
        updateValue(e.target.id, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    }

    return { values, onChange: handleChange, updateValue };
}
