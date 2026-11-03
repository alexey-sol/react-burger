import { useCallback, useMemo, useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [isOn, setIsOn] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setIsOn((prevValue) => !prevValue);
  }, []);

  const on = useCallback(() => {
    setIsOn(true);
  }, []);

  const off = useCallback(() => {
    setIsOn(false);
  }, []);

  return useMemo(() => ({ isOn, on, off, toggle }), [isOn, on, off, toggle]);
};
