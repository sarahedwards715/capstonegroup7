// I wrote this hook for the Kwitter Project. It should be reusable.
// Credits to Brian Design for his video tutorial - https://www.youtube.com/watch?v=KGFG-yQD7Dw

import { useState, useEffect } from "react";

const useForm = (handleSubmit, validate, values, confirmPassword = "") => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleValidate = (e) => {
    e.preventDefault()
    setIsSubmitting(true);
    setErrors(validate(values, confirmPassword));
    console.log("errors from handle validate", errors);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmit();
    }
  }, [errors]);

  return { handleValidate, errors, setErrors };
};

export default useForm;
