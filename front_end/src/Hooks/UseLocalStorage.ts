import { useEffect, useState } from "react";

export const useLocalStorage = (defaultValue: string, key: string) => {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue, key]);

  return [value, setValue];
};
