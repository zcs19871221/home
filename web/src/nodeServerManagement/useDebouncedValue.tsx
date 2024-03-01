import { Input } from 'antd';
import { useState, useLayoutEffect, useEffect } from 'react';

export function useDebouncedValue<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useLayoutEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);

    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DebouncedInput({ value, onChange, ...props }: any) {
  const [text, setText] = useState(value);
  const debouncedValue = useDebouncedValue(text);

  useEffect(() => {
    onChange(debouncedValue);
  }, [onChange, debouncedValue]);

  return (
    <Input
      {...props}
      value={text}
      onChange={(e) => {
        setText(e.target.value?.trim());
      }}
    />
  );
}
