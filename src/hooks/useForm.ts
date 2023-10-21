import React, { useState, useEffect } from "react";

const useForm = (callback: () => void, validate: (values: any) => {}) => {
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors || {}).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event: React.FormEvent) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values: any) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
