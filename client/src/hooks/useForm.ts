import { useState, useCallback } from 'react';

interface UseFormProps {
    initialValue: string;
    resetOnSubmit?: boolean;
    onSubmit: (value: string) => void;
    validate?: (value: string) => string | null;
    onReset?: () => void;
}

export function useForm({ initialValue, validate, onSubmit, onReset, resetOnSubmit = true }: UseFormProps) {
    const [value, setValue] = useState(initialValue);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        if (errorDetails) {
            setErrorDetails(null);
        }
    }, [errorDetails]);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const trimmedContent = value.trim();
        if (validate) {
            const validationError = validate(trimmedContent);
            if (validationError) {
                setErrorDetails(validationError);
                return;
            }
        }
        onSubmit(trimmedContent);
        if(resetOnSubmit){
            handleReset();
        }
    }, [value, validate, onSubmit]);

    const handleReset = useCallback(() => {
        setValue(initialValue);
        setErrorDetails(null);
        if (onReset) {
            onReset();
        }
    }, [initialValue, onReset]);

    return {
        value,
        errorDetails,
        handleInputChange,
        handleSubmit,
        handleReset
    };
}
