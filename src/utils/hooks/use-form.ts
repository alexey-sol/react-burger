import { useState, type ChangeEvent } from 'react';

type UseFormResult<T> = {
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useForm = <T>(inputValues: T): UseFormResult<T> => {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value.trim() });
  };

  return { values, handleChange, setValues };
};
