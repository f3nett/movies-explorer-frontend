import { useState, useCallback } from 'react';

function useFormValidation({ defaultValues, defaultValid, defaultValidations }) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState('');
    const [isValid, setIsValid] = useState(defaultValid);
    const [validations, setValidations] = useState(defaultValidations);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (value !=='' & validations.hasOwnProperty(name)) {
            const regex = validations[name].pattern;
            if (!regex.test(value)) {
                setErrors({ ...errors, [name]: validations[name].errorMessage });
                setIsValid(false);
            } else {
                setErrors({ ...errors, [name]: e.target.validationMessage });
                setIsValid(e.target.closest('form').checkValidity());
            }
        } else {
            setErrors({ ...errors, [name]: e.target.validationMessage });
            setIsValid(e.target.closest('form').checkValidity());
        }
    };

    const resetForm = useCallback(
        (newValues = defaultValues, newErrors = defaultValues, newIsValid = defaultValid) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}

export default useFormValidation;
