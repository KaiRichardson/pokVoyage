import { useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => FormErrors
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors[name as string]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validationErrors[name as string],
        }));
      }
    }
  };

  const handleSubmit = (callback: (values: T) => void) => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        callback(values);
      }
    } else {
      callback(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};