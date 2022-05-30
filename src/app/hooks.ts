import { ChangeEvent, useState } from "react";
import { useEffect, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, AppState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
  return { value, setValue, onChange };
};
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
